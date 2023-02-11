import mongoose from "mongoose";

const reqString = {
  type: String,
  required: true,
};

const ExerciseSchema = new mongoose.Schema({
  workoutId: reqString,
  exerciseName: reqString,
  exerciseSets: reqString,
  exerciseReps: reqString,
  exerciseWeight: reqString,
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);
export default Exercise;
