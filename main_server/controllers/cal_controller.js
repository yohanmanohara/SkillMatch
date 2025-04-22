
const userModel = require('../models/userModel');
const { isValidObjectId } = require('mongoose');
const axios = require('axios');

const getapikey = async (req, res) => {
    const { userId } = req.body;
    const user = await userModel.findById(userId).select('apiKey');
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }
    if (!user.apiKey) {
        return res.status(404).json({
            success: false,
            message: 'API key not found'
        });
    }
    console.log(user.apiKey);
    return res.status(200).json({
        success: true,
        apiKey: user.apiKey
    });


}

const calapikeystore = async (req, res) => {
    const { inputApiKey, userId } = req.body;

    try {
        // Validate user ID format
        if (!isValidObjectId(userId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user ID format'
            });
        }

        // Validate input API key format
        if (!inputApiKey || typeof inputApiKey !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Valid API key is required'
            });
        }

        // First check if the user exists and already has the same API key
        const existingUser = await userModel.findOne({
            _id: userId,
            apiKey: inputApiKey
        });

        if (existingUser) {
            return res.status(200).json({
                success: true,
                message: 'API key already exists and matches',
                user: {
                    apiKey: existingUser.apiKey,
                    name: existingUser.name,
                    email: existingUser.email
                }
            });
        }

        // If not, proceed with update
        const updatedUser = await userModel.findByIdAndUpdate(
            { 
                _id: userId
            },
            { 
                $set: { 
                    apiKey: inputApiKey
                } 
            },
            { 
                new: true,
                runValidators: true,
                select: 'apiKey name email' 
            }
        );  

        // Check if user was found and updated
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'API key updated successfully',
            user: updatedUser
        });

    } catch (error) {
        console.error('Error updating API key:', error);
        
        let errorMessage = 'Failed to update API key';
        if (error.name === 'ValidationError') {
            errorMessage = error.message;
        }

        res.status(500).json({
            success: false,
            message: errorMessage,
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const getcaluser = async (req, res) => {
    try {
        const { userId } = req.body; // Get userId from request body
        
        if (!userId) {
            return res.status(400).json({ 
                success: false,
                message: 'User ID is required in request body'
            });
        }

        if (!isValidObjectId(userId)) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid User ID format'
            });
        }

        const user = await userModel.findById(userId)
            .select('calUsername calEventType name email')
            .lean();

        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                calUsername: user.calUsername,
                calEventType: user.calEventType || '45min'
            }
        });

    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ 
            success: false,
            message: 'Internal server error'
        });
    }
};
const update_cal = async (req, res) => {
    const { userId } = req.query;
    const { calUsername } = req.body;

    try {
        // Validate user ID format
        if (!isValidObjectId(userId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user ID format'
            });
        }

        // Validate calUsername format
        if (!calUsername || typeof calUsername !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Valid Cal.com username is required'
            });
        }

        // Find and update the user, use $set to explicitly update the calUsername field
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $set: { calUsername } }, // Use $set to add the field if it doesn't exist
            { 
                new: true, 
                runValidators: true,
                select: 'calUsername name email' 
            }
        );

        // Check if user was found and updated
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Return success response with updated user data
        res.status(200).json({
            success: true,
            message: 'Cal.com username updated successfully',
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                calUsername: updatedUser.calUsername
            }
        });

    } catch (error) {
        console.error('Error updating Cal username:', error);
        
        // Customize the error message based on the error type
        let errorMessage = 'Failed to update Cal.com settings';
        if (error.name === 'ValidationError') {
            errorMessage = error.message;
        }

        // Send error response with detailed information in development mode
        res.status(500).json({
            success: false,
            message: errorMessage,
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const calbookings = async (req, res) => {
    const { apiKey } = req.body;
    try {
       

        if (!apiKey) {
            return res.status(500).json({
                success: false,
                error: 'Server configuration error'
            });
        }

        const calResponse = await axios.get(`https://api.cal.com/v2/bookings`, {
            headers: {
                'Authorization': apiKey,
                'cal-api-version': '2024-08-13'
            },
            timeout: 10000
        });


        return res.status(200).json(calResponse.data);

    } catch (error) {
        console.error('Cal.com API error:', error);

        let status = 500;
        let message = 'Internal server error';

        if (axios.isAxiosError(error)) {
            if (error.response) {
                status = error.response.status;
                message = error.response.data?.message || 'Cal.com API error';
            } else if (error.request) {
                message = 'No response from Cal.com API';
            } else if (error.code === 'ECONNABORTED') {
                message = 'Request to Cal.com timed out';
            }
        }

        return res.status(status).json({ success: false, error: message });
    }
};






module.exports = { getcaluser ,update_cal,calbookings,getapikey,calapikeystore};