import User from "../models/User.js";
import Workout from "../models/Workout.js";

export const getWorkouts = async (req, res) => {
  try {
    const { userId } = req.params;
    const workouts = await Workout.find({ userId });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

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

export const deleteWorkout = async (req, res) => {
  try {
    const deleteWorkout = await Workout.findByIdAndDelete(req.params.id);
    res.status(200).json("Workout deleted");
  } catch (error) {
    res.json(400).json({ message: err.message });
  }
};

export const editWorkout = async (req, res) => {
  try {
    const editWorkout = await Workout.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Workout updated");
  } catch (error) {
    res.json(404).json({ message: err.message });
  }
};
