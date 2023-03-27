import User from "../models/User.js";
import Workout from "../models/Workout.js";

// Fetch all workouts of the user
export const getWorkouts = async (req, res) => {
  try {
    const { userId } = req.params;
    const workouts = await Workout.find({ userId });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Fetch one workout of the user
export const getWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOne({ _id: req.params.id });
    res.status(200).json(workout);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Create a new workout
export const addWorkout = async (req, res) => {
  try {
    const { userId, workoutName, workoutType, workoutDate, workoutExercises } =
      req.body;
    const user = await User.findById(userId);
    const newWorkout = new Workout({
      userId,
      workoutName,
      workoutType,
      workoutDate,
      workoutExercises,
    });
    await newWorkout.save();
    const workouts = await Workout.find();
    res.status(201).json(newWorkout);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// Delete the selected workout
export const deleteWorkout = async (req, res) => {
  try {
    const deleteWorkout = await Workout.findByIdAndDelete(req.params.id);
    res.status(200).json("Workout deleted");
  } catch (error) {
    res.json(400).json({ message: err.message });
  }
};

// Update the selected workout
export const editWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const { workoutName, workoutType, workoutDate, workoutExercises } =
      req.body;
    const editWorkout = await Workout.findByIdAndUpdate(
      { _id: id },
      {
        workoutName,
        workoutType,
        workoutDate,
        workoutExercises,
      }
    );
    res.status(200).json(editWorkout);
  } catch (error) {
    res.json(500).json({ message: err.message });
  }
};
