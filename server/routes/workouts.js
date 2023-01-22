import express from "express"
import {getWorkouts, addWorkout, deleteWorkout, editWorkout} from "../controllers/workouts.js"
import { verifyToken } from "../middleware/authorization.js"

const router = express.Router()

// Fetch all workouts
router.get("/", verifyToken, getWorkouts)

// Add a workout
router.post("/", verifyToken, addWorkout)

// Delete a workout
router.delete("/:id", verifyToken, deleteWorkout)

// Edit a workout
router.patch("/:id", verifyToken, editWorkout)

export default router