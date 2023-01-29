import mongoose from "mongoose";

const reqNumber = {
  type: Number,
  required: true,
};

const ExerciseSchema = new mongoose.Schema({
  exerciseName: {
    type: String,
    required: true,
  },
  exerciseSets: reqNumber,
  exerciseReps: reqNumber,
  exerciseWeight: reqNumber,
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);
export default Exercise;
