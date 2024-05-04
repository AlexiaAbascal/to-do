require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const tasksRoutes = require('./routes/tasks_r')
const mongoose = require('mongoose')

// creates express app 
const app = express();

// middleware
app.use(morgan('dev'))
app.use(express.json())

// routes
app.use('/tasks', tasksRoutes);

// connects to db
mongoose.connect(process.env.MONGO_URL)
    .then(() => {

        // listen to request once connected to db
        app.listen(process.env.PORT, () =>{
            console.log("connected to db, port: ", process.env.PORT);
        })
    })
    .catch((err) => {
        console.error(err)
    })