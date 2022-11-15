const express = require('express')
require('dotenv').config()
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')
const serverless = require('serverless-http')
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}


//express app
const app = express()

// middleware
app.unsubscribe(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use(express.json())
app.use(cors(corsOptions)) // Use this after the variable declaration

// app.use('/.netlify/functions', workoutRoutes)
// routes
app.use('/api/workouts', workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    // listen for requests
    app.listen(process.env.PORT, () => {
        console.log('MongoDB connected and listening on port:', process.env.PORT)
    })

})
.catch((error)=> console.log(error))

module.exports.handler = serverless(app)