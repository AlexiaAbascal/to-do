// controllers/taskLogs_c.js

const User = require('../models/users_m');

// Delete all task logs for a user
const delete_all_task_logs = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user and remove all task logs
        await User.findByIdAndUpdate(userId, { taskLogs: [] });

        res.status(200).json({ message: 'All task logs deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    delete_all_task_logs
};
