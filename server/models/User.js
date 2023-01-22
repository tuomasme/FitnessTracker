import mongoose from "mongoose"
import Workout from "./Workout.js"
import Record from "./Record.js"

const UserSchema = new mongoose.Schema(    
    {
        username: {
            type: String,
            require: true,
            min: 6,
            max: 30
        },
        password: {
            type: String,
            require: true,
            min: 8,
            max: 16
        },
        workouts: [Workout],
        records: [Record]
    }
)

const User = mongoose.model("User", UserSchema)
export default User