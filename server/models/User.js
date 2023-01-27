import mongoose from "mongoose"
import Workout from "./Workout.js"
import Record from "./Record.js"

const reqString = {
    type: String,
    required: true
}

const UserSchema = new mongoose.Schema(    
    {
        firstName: reqString,
        lastName: reqString,
        email: {
            type: String,
            require: true,
            unique: true
        },
        username: {
            type: String,
            require: true,
            min: 6,
            max: 16,
            unique: true
        },
        password: {
            type: String,
            require: true,
            min: 8,
            max: 50
        },
        workouts: [Workout.schema],
        records: [Record.schema]
    }
)

const User = mongoose.model("User", UserSchema)
export default User