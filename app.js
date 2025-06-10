import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoutes.js";

const app = express();

// Load environment variables first
dotenv.config({ path: "./config/config.env" });

// Connect to database
dbConnection();

// Middlewares
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/Reservation', reservationRouter);

// Error handling middleware (should come after routes)
app.use(errorMiddleware);

export default app;
