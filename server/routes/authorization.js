import express from "express"
import { login, register } from "../controllers/authorization.js"

const router = express.Router()

// Registering
router.post("/register", register)

// Logging in
router.post("/login", login)

export default router