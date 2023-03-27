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

// Route for fetching all records of the user
router.get("/:userId", verifyToken, getRecords);

// Route for fetching one record of the user
router.get("/:userid/:id", verifyToken, getRecord);

// Route for creating a new record
router.post("/:userId/", verifyToken, addRecord);

// Route for deleting the selected record
router.delete("/:userId/:id", verifyToken, deleteRecord);

// Route for updating the selected record
router.patch("/:userId/:id", verifyToken, editRecord);

export default router;
