import express from "express"
import {getWorkouts, addWorkout, deleteWorkout, editWorkout} from "../controllers/workouts.js"

const router = express.Router()

// Fetch all workouts
router.get("/", getWorkouts)

// Add a workout
router.post("/", addWorkout)

// Delete a workout
router.delete("/:id", deleteWorkout)

// Edit a workout
router.patch("/:id", editWorkout)

export default router