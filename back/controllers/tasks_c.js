const Task = require('../models/tasks_m')
const mongoose = require('mongoose')

// GET ALL TASKS
const get_all_tasks = async (req,res) => {
    const tasks = await Task.find({})
    res.status(200).json(tasks)
}

// GET ONE SINGLE TASK
const get_single_task = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Task not found'})
    }

    const task = await Task.findById(id)

    if(!task){
        return res.status(404).json({error: 'Task not found'})
    }

    res.status(200).json(task)
}

// CREATE ONE TASK
const create_task = async (req,res) => {
    const {title,description,due_date,status} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(!due_date){
        emptyFields.push('due_date')
    }
    if(!status){
        emptyFields.push('status')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }


    try {
        const task = await Task.create({title, description, due_date, status})
        res.status(200).json(task)
    } catch (err) {
        res.status(400).json({err: err.message})
    }
}

// DELETE ONE TASK
const delete_task = async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Task not found'})
    }

    const task = await Task.findOneAndDelete({_id : id})

    if(!task){
        return res.status(404).json({error: 'Task not found'})
    }

    res.status(200).json(task)
}

// UPDATE ONE TASK
const update_task = async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Task not found'})
    }

    const task = await Task.findOneAndUpdate({_id : id}, {
        ...req.body
    },{ new : true})

    if(!task){
        return res.status(404).json({error: 'Task not found'})
    }

    res.status(200).json(task)

}

module.exports = {
    get_all_tasks,
    get_single_task,
    create_task,
    delete_task,
    update_task

}