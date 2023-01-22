import Workout from "../models/Workout.js"

export const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find() 
        res.status(200).json(workouts)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const addWorkout = async (req, res) => {
  try {
    const newWorkout = new Workout({
        workout_name: req.body.workout_name,
        workout_type: req.body.workout_type,
        date: req.body.date,
        exercises: []
    })
    await newWorkout.save();
    res.status(201).json(newWorkout);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

export const deleteWorkout = async (req, res) => {
    try {
        const deleteWorkout = await Workout.findByIdAndDelete(req.params.id)
        res.status(200).json('Post deleted')
    } catch (error) {
        res.json(400).json({ message: err.message })
    }
}

export const editWorkout = async (req, res) => {
    try {
        const editWorkout = await Workout.findByIdAndUpdate(req.params.id, {$set: req.body})
        res.status(200).json('Post updated')
    } catch (error) {
        res.json(404).json({ message: err.message })
    }
}

