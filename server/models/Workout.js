import mongoose from "mongoose";
import Exercise from "./Exercise.js";

const reqString = {
  type: String,
  required: true,
};

const WorkoutSchema = new mongoose.Schema({
  userId: reqString,
  workoutName: reqString,
  workoutType: reqString,
  workoutDate: reqString,
  workoutExercises: [Exercise.schema],
});

const Workout = mongoose.model("Workout", WorkoutSchema);
export default Workout;
