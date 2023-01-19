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
        date: Date.now(),
        exercises: []
    })
    await newWorkout.save();
    const workout = await Workout.find()
    res.status(201).json(newWorkout);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

