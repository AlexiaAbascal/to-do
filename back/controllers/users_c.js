const User = require('../models/users_m')
const mongoose = require('mongoose')

// GET ALL USERS
const get_all_users = async (req,res) => {
    const user = await User.find({})
    res.status(200).json(user)
}


const get_user_task_logs = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('taskLogs.task');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user.taskLogs);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// GET ONE SINGLE USER
const get_single_user = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User not found'})
    }

    const user = await User.findById(id)

    if(!user){
        return res.status(404).json({error: 'User not found'})
    }

    res.status(200).json(user)
}

// GET ONE SINGLE USER BY USERNAME
const get_single_user_by_username = async (req, res) => {
    const { username } = req.params;

    try {
        console.log('Searching for user with username:', username);

        // Check if the user with the given username exists in your database
        const user = await User.findOne({ username });

        if (user) {
            // If the user exists, return success response
            console.log('User found:', user);
            res.status(200).json(user);
        } else {
            // If the user does not exist, return error response
            console.log('User not found');
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user by username:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// CREATE ONE USER
const create_user = async (req,res) => {
    const {username} = req.body

    let emptyFields = []

    if(!username){
        emptyFields.push('username')
    }
   
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }


    try {
        const user = await User.create({username})
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json({err: err.message})
    }
}

// DELETE ONE USER
const delete_user = async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User not found'})
    }

    const user = await User.findOneAndDelete({_id : id})

    if(!user){
        return res.status(404).json({error: 'User not found'})
    }

    res.status(200).json(user)
}

// UPDATE ONE USER
const update_user = async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User not found'})
    }

    const user = await User.findOneAndUpdate({_id : id}, {
        ...req.body
    },{ new : true})

    if(!user){
        return res.status(404).json({error: 'User not found'})
    }

    res.status(200).json(user)

}

module.exports = {
    get_all_users,
    get_single_user,
    get_single_user_by_username,
    create_user,
    delete_user,
    update_user,
    get_user_task_logs

}