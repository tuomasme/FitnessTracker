import express from "express";
import {
  addWorkout,
  deleteWorkout,
  editWorkout,
  getWorkout,
  getWorkouts,
} from "../controllers/workouts.js";
import { verifyToken } from "../middleware/authorization.js";

const router = express.Router();

// Fetch workouts of one user
router.get("/:userId/", verifyToken, getWorkouts);

// Fetch one workout of the user
router.get("/:userid/:id", verifyToken, getWorkout);

// Add a workout
router.post("/:userId/", verifyToken, addWorkout);

// Delete a workout
router.delete("/:userId/:id", verifyToken, deleteWorkout);

// Edit a workout
router.patch("/:userId/:id", verifyToken, editWorkout);

export default router;
