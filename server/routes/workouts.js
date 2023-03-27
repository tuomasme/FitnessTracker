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

// Route for fetching all workouts of the user
router.get("/:userId/", verifyToken, getWorkouts);

// Route for fetching one workout of the user
router.get("/:userid/:id", verifyToken, getWorkout);

// Route for creating a new workout
router.post("/:userId/", verifyToken, addWorkout);

// Route for deleting the selected workout
router.delete("/:userId/:id", verifyToken, deleteWorkout);

// Route for updating the selected workout
router.patch("/:userId/:id", verifyToken, editWorkout);

export default router;
