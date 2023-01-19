import express from "express"
import {getWorkouts} from "../controllers/workouts.js"

const router = express.Router()

router.get("/", getWorkouts)

export default router