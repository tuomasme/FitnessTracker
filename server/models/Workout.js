import mongoose from "mongoose";

const reqString = {
  type: String,
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
      exerciseSets: reqString,
      exerciseReps: reqString,
      exerciseWeight: reqString,
    },
  ],
});

const Workout = mongoose.model("Workout", WorkoutSchema);
export default Workout;
