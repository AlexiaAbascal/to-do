const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskLogSchema = new Schema({
    action: {
        type: String,
        enum: ['created'],
        required: true
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = taskLogSchema;