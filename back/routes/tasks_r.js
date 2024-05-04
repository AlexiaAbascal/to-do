const express = require('express');
const router = express.Router();
const {
    get_all_tasks,
    get_single_task,
    create_task,
    delete_task,
    update_task

} = require('../controllers/tasks_c')

// Get all
router.get('/',get_all_tasks)

// Get a single one
router.get('/:id',get_single_task)

// Post a new 
router.post('/', create_task)

// Delete 
router.delete('/:id',delete_task)

// Update a new 
router.patch('/:id',update_task)

module.exports = router