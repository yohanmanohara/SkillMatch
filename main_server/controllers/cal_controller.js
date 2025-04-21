// controllers/userController.js
const userModel = require('../models/userModel');
const { isValidObjectId } = require('mongoose');

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


module.exports = { getcaluser ,update_cal};