import express from "express";
import {
  getRecords,
  addRecord,
  deleteRecord,
  editRecord,
  getUserRecords,
} from "../controllers/records.js";
import { verifyToken } from "../middleware/authorization.js";

const router = express.Router();

// Fetch all records
router.get("/", verifyToken, getRecords);

// Fetch records of one user
router.get("/:userId/", verifyToken, getUserRecords);

// Add a record
router.post("/:userId/", verifyToken, addRecord);

// Delete a record
router.delete("/:userId/:id", verifyToken, deleteRecord);

// Edit a record
router.patch("/userId/:id", verifyToken, editRecord);

export default router;
