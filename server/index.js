import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import workoutRoutes from "./routes/workouts.js";
import authorizationRoutes from "./routes/authorization.js";
import recordRoutes from "./routes/records.js";

// Configurations
const app = express();
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Mongoose setup
const PORT = process.env.PORT || 5500;
mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log("Server connected"));
  })
  .catch((error) => console.log`${error} NO connection`);

// Routes
app.use("/workouts", workoutRoutes);
app.use("/authorization", authorizationRoutes);
app.use("/records", recordRoutes);
