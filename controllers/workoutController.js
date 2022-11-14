const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')

// get all wokouts

const getWorkouts = async(req, res) => {
    const wokouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(wokouts)
}

// get single workouts

const getWorkout = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const wokout = await Workout.findById(id)
    if(!wokout){
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(wokout)
}

// create new workout

const createWorkout = async (req, res) => {
    // add doc db
    try{
        const { title, load, reps } = req.body
        const workout = await Workout.create({ title, load, reps })
        res.status(200).json(workout)
    } catch (err) { 
        res.status(400).json({error: err.message})
    }
}

// delete workout

const deleteWorkout = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findByIdAndDelete({_id: id})

    if(!workout){
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

// update workout

    const updateWorkout = async(req, res) => {
        const { id } = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(404).json({error: 'No such workout'})
        }

        const workout = await Workout.findByIdAndUpdate({_id: id}, {
            ...req.body
        })

        if(!workout){
            return res.status(404).json({error: 'No such workout'})
        }

        res.status(200).json(workout)
    }

module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}