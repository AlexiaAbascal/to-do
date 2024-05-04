const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    due_date : {
        type : Date,
        required : true
    },
    status : {
        type : String,
        required : true
    }
}, { timestamps: true })

module.exports = mongoose.model('Task',taskSchema)
