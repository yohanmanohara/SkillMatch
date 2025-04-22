// controllers/bookingController.js
const User = require('../models/userModel');

const fetchUserIds = async () => {
    console.log('Fetching user IDs and calapikeys...');
    try {
        const users = await User.find({}, '_id apiKey');  // fetch both at once

        const result = users.map(user => ({
            userId: user._id,
            calapikey: user.apiKey
        }));

        console.log('Fetched user ID - calapikey pairs:', result);
        return result;

    } catch (error) {
        console.error('Error fetching user IDs and calapikeys:', error);
        throw error;
    }
};

module.exports = fetchUserIds;
