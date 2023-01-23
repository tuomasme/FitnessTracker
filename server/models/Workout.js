import mongoose from "mongoose"
import Exercise from "./Exercise.js"

const reqString = {
    type: String,
    required: true
}

const WorkoutSchema = new mongoose.Schema(
    {
        workoutName: reqString,
        workoutType: reqString,
        date: reqString,
        exercises: [Exercise.schema]
    }
)

const Workout = mongoose.model("Workout", WorkoutSchema)
export default Workout