// user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const taskLogSchema = require('./tasklog_m'); // Importing taskLogSchema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    taskLogs: [taskLogSchema] // Using taskLogSchema
});

module.exports = mongoose.model('User', userSchema);
