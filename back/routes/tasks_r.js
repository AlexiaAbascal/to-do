const express = require('express');
const router = express.Router();
const {
    get_all_tasks,
    get_single_task,
    create_task,
    delete_task,
    update_task
} = require('../controllers/tasks_c');

const {
    get_all_users,
    get_single_user,
    get_single_user_by_username,
    create_user,
    delete_user,
    update_user,
    get_user_task_logs
} = require('../controllers/users_c');

const taskLogsController = require('../controllers/logs_c');

// Delete all task logs for a user
router.delete('/users/:userId/tasklogs', taskLogsController.delete_all_task_logs);

// Task logs route
router.get('/users/:userId/tasklogs', get_user_task_logs); // Get task logs for a user

// User routes
router.get('/users', get_all_users);
router.get('/users/:id', get_single_user);
router.get('/users/username/:username', get_single_user_by_username);
router.post('/users', create_user);
router.delete('/users/:id', delete_user);
router.patch('/users/:id', update_user);

// Task routes nested under user
router.get('/users/:userId/tasks', get_all_tasks); // Get all tasks for a user
router.get('/users/:userId/tasks/:taskId', get_single_task); // Get a single task for a user
router.post('/users/:userId/tasks', create_task); // Create a task for a user
router.delete('/users/:userId/tasks/:taskId', delete_task); // Delete a task for a user
router.patch('/users/:userId/tasks/:taskId', update_task); // Update a task for a user

module.exports = router;
