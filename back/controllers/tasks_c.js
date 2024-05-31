const Task = require('../models/tasks_m');
const User = require('../models/users_m'); 
const mongoose = require('mongoose');

// GET ALL TASKS FOR A USER
const get_all_tasks = async (req, res) => {
    const { userId } = req.params;

    try {
        const tasks = await Task.find({ assignedTo: userId });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// GET A SINGLE TASK FOR A USER
const get_single_task = async (req, res) => {
    const { userId, taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(404).json({ error: 'Task not found' });
    }

    try {
        const task = await Task.findOne({ _id: taskId, assignedTo: userId });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// CREATE A TASK FOR A USER
const create_task = async (req, res) => {
    const { userId } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'Please provide title and description for the task' });
    }

    try {
        let task = await Task.create({ title, description, assignedTo: userId });
        // If task creation is successful, update the user's task logs
        await User.findByIdAndUpdate(userId, {
            $push: { taskLogs: { action: 'created', task: task._id } }
        });
        res.status(201).json(task);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Internal server error' });
    }
};

// DELETE A TASK FOR A USER
const delete_task = async (req, res) => {
    const { userId, taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(404).json({ error: 'Task not found' });
    }

    try {
        const task = await Task.findOneAndDelete({ _id: taskId, assignedTo: userId });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// UPDATE A TASK FOR A USER
const update_task = async (req, res) => {
    const { userId, taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(404).json({ error: 'Task not found' });
    }

    try {
        const task = await Task.findOneAndUpdate(
            { _id: taskId, assignedTo: userId },
            { ...req.body },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    get_all_tasks,
    get_single_task,
    create_task,
    delete_task,
    update_task
};
