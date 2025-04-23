// controllers/bookingController.js
const User = require('../models/userModel');
const axios = require('axios');
const Booking = require('../models/calbooking');

const fetchUserIds = async (req, res) => {
    console.log('Fetching user IDs and calapikeys...');
    try {
        // Fetch users' _id and apiKey fields
        const users = await User.find({}, '_id apiKey');  

        // Process all users
        const results = await Promise.all(users.map(async (user) => {
            const result = {
                userId: user._id.toString(),
                calapikey: user.apiKey,
                status: '',
                newBookings: [],
                updatedCount: 0,
                clearedBookings: false,
                error: null
            };

            // Handle cases where API key is empty or invalid
            if (!user.apiKey || typeof user.apiKey !== 'string' || user.apiKey.trim().length === 0) {
                result.status = 'skipped';
                result.error = 'API key is empty or invalid';
                
                // Clear existing bookings if API key is removed
                try {
                    const updateResult = await Booking.findOneAndUpdate(
                        { userId: user._id.toString() },
                        { 
                            $set: { 
                                bookings: [],
                                calapikey: null,
                                lastUpdated: new Date(),
                                error: 'API key removed' 
                            } 
                        },
                        { new: true }
                    );
                    
                    if (updateResult) {
                        result.clearedBookings = true;
                        result.status = 'cleared';
                    }
                } catch (dbError) {
                    console.error(`Error clearing bookings for user ${user._id}:`, dbError);
                    result.error = 'Failed to clear bookings';
                }
                
                return result;
            }

            // Process users with valid API keys
            try {
                // Fetch booking data from Cal.com API
                const calResponse = await axios.get('https://api.cal.com/v2/bookings', {
                    headers: {
                        'Authorization': `Bearer ${user.apiKey}`,
                        'cal-api-version': '2024-08-13'
                    },
                    timeout: 10000
                });

                if (!calResponse.data || calResponse.data.status !== 'success') {
                    throw new Error('Invalid API response');
                }

                const apiBookings = calResponse.data.data || [];
                const newBookingArray = [];

                // Get existing bookings from database
                const existingBookingDoc = await Booking.findOne({ userId: user._id.toString() });
                const existingBookings = existingBookingDoc?.bookings || [];

                // Process each booking from API
                for (const apiBooking of apiBookings) {
                    const bookingData = {
                        bookingId: apiBooking.id,
                        uid: apiBooking.uid,
                        title: apiBooking.title,
                        description: apiBooking.description || '',
                        status: apiBooking.status || 'unknown',
                        start: new Date(apiBooking.start),
                        end: new Date(apiBooking.end),
                        duration: apiBooking.duration,
                        meetingUrl: apiBooking.meetingUrl || '',
                        location: apiBooking.location || '',
                        createdAt: new Date(apiBooking.createdAt),
                        updatedAt: new Date(apiBooking.updatedAt),
                        cancellationReason: apiBooking.cancellationReason || null,
                        cancelledByEmail: apiBooking.cancelledByEmail || null,
                        metadata: apiBooking.metadata || {},
                        attendees: apiBooking.attendees || [],
                        guests: apiBooking.guests || []
                    };

                    // Check if booking already exists
                    const exists = existingBookings.some(
                        b => b.bookingId === apiBooking.id || b.uid === apiBooking.uid
                    );

                    if (!exists) {
                        newBookingArray.push(bookingData);
                        result.newBookings.push(bookingData);
                        result.updatedCount++;
                    }
                }

                // Update database with new bookings or clear if no bookings exist
                await Booking.findOneAndUpdate(
                    { userId: user._id.toString() },
                    { 
                        $set: { 
                            bookings: newBookingArray.length > 0 ? 
                                [...(existingBookings || []), ...newBookingArray] : 
                                existingBookings,
                            calapikey: user.apiKey,
                            lastUpdated: new Date(),
                            error: null
                        } 
                    },
                    { upsert: true, new: true }
                );

                result.status = 'completed';
                return result;

            } catch (error) {
                console.error(`Error processing user ${user._id}:`, error);
                result.error = error.message;
                result.status = 'failed';
                
                // Update database with error
                await Booking.findOneAndUpdate(
                    { userId: user._id.toString() },
                    { 
                        $set: { 
                            error: error.message,
                            lastUpdated: new Date() 
                        } 
                    },
                    { upsert: true }
                );
                
                return result;
            }
        }));

        return res.status(200).json({
            success: true,
            data: results,
            stats: {
                totalUsers: users.length,
                completed: results.filter(r => r.status === 'completed').length,
                cleared: results.filter(r => r.status === 'cleared').length,
                failed: results.filter(r => r.status === 'failed').length,
                skipped: results.filter(r => r.status === 'skipped').length
            }
        });

    } catch (error) {
        console.error('System error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

module.exports = fetchUserIds;