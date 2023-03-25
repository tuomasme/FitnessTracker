import mongoose from "mongoose";

const reqString = {
  type: String,
  required: true,
};

const reqNumber = {
  type: Number,
  required: true,
};

const WorkoutSchema = new mongoose.Schema({
  userId: reqString,
  workoutName: reqString,
  workoutType: reqString,
  workoutDate: reqString,
  workoutExercises: [
    {
      exerciseName: reqString,
      exerciseSets: reqNumber,
      exerciseReps: reqNumber,
      exerciseWeight: reqNumber,
    },
  ],
});

const Workout = mongoose.model("Workout", WorkoutSchema);
export default Workout;
