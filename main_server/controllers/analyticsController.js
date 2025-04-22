const BaseController = require('./BaseController');
const AppliedJob = require('../models/appliedJobs');
const mongoose = require('mongoose');

class TrendAnalysisController extends BaseController {
    constructor() {
        super(AppliedJob);
    }

    async getApplicationTrends(req, res) {
        try {
            const { timeInterval = 'daily', organizationId, startDate, endDate, status } = req.query;
            
            console.log('Trend analysis query parameters:', req.query);
            
            // Build match conditions
            const matchConditions = {};
            
            if (organizationId) {
                matchConditions.organizationId = mongoose.Types.ObjectId(organizationId);
            }
            
            if (status) {
                matchConditions.status = status;
            }

            // Add date range filters if provided
            if (startDate || endDate) {
                matchConditions.appliedDate = {};
                if (startDate) {
                    matchConditions.appliedDate.$gte = new Date(startDate);
                }
                if (endDate) {
                    matchConditions.appliedDate.$lte = new Date(endDate);
                }
            }

            // Define the group stage based on the time interval
            const groupStage = {
                _id: this.getGroupIdByTimeInterval(timeInterval),
                count: { $sum: 1 }
            };

            // Pipeline for aggregation
            const pipeline = [
                { $match: matchConditions },
                { $group: groupStage },
                { $sort: { "_id.year": 1, "_id.month": 1, "_id.week": 1, "_id.day": 1 } }
            ];

            console.log('Executing aggregation pipeline:', JSON.stringify(pipeline));
            
            // Execute aggregation
            const trends = await AppliedJob.aggregate(pipeline);
            
            console.log('Trends result:', trends);

            // Format the results
            const formattedTrends = trends.map(trend => ({
                date: this.formatDate(trend._id, timeInterval),
                count: trend.count
            }));

            return res.status(200).json(formattedTrends);
        } catch (error) {
            console.error('Error in TrendAnalysisController.getApplicationTrends:', error);
            return res.status(500).json({ 
                message: "Error fetching application trends", 
                error: error.message 
            });
        }
    }

    getGroupIdByTimeInterval(timeInterval) {
        const groupId = {
            year: { $year: "$appliedDate" },
            month: { $month: "$appliedDate" }
        };
        
        if (timeInterval === 'daily') {
            groupId.day = { $dayOfMonth: "$appliedDate" };
        } else if (timeInterval === 'weekly') {
            groupId.week = { $week: "$appliedDate" };
        }
        
        return groupId;
    }

    formatDate(id, timeInterval) {
        const { year, month, week, day } = id;
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        
        if (timeInterval === 'daily') {
            return `${day} ${monthNames[month-1]} ${year}`;
        } else if (timeInterval === 'weekly') {
            return `Week ${week}, ${monthNames[month-1]} ${year}`;
        } else {
            return `${monthNames[month-1]} ${year}`;
        }
    }
}

module.exports = new TrendAnalysisController();