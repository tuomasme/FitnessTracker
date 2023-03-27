import express from "express";
import { login, register } from "../controllers/authorization.js";

const router = express.Router();

// Route for registering
router.post("/register", register);

// Route for logging in
router.post("/login", login);

export default router;
