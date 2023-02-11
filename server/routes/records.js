import express from "express";
import {
  getRecords,
  getRecord,
  addRecord,
  deleteRecord,
  editRecord,
} from "../controllers/records.js";
import { verifyToken } from "../middleware/authorization.js";

const router = express.Router();

// Fetch all records of the user
router.get("/:userId", verifyToken, getRecords);

// Fetch one record of the user
router.get("/:userid/:id", verifyToken, getRecord);

// Add a record
router.post("/:userId/", verifyToken, addRecord);

// Delete a record
router.delete("/:userId/:id", verifyToken, deleteRecord);

// Edit a record
router.patch("/:userId/:id", verifyToken, editRecord);

export default router;
