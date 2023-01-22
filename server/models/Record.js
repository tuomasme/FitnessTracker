import mongoose from "mongoose"

const RecordSchema = new mongoose.Schema(
    {
        exercise_name: {
            type: String,
            required: true
        },
        exercise_weight: Number
    }
)

const Record = mongoose.model("Record", RecordSchema)
export default Record