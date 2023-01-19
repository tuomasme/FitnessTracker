import mongoose from "mongoose"

const reqString = {
    type: String,
    required: true
}

const WorkoutSchema = new mongoose.Schema(
    {
        workout_name: reqString,
        date: Date,
        exercises: {
            type: Array,
            default: []
        }
    }
)

const Workout = mongoose.model("Workout", WorkoutSchema)
export default Workout