import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "./config/config";
import * as currencyController from "./controllers/currencyController";
import { logger } from "./utils/logger";

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((err) => logger.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post("/api/convert", currencyController.convert);
app.get("/api/currencies", currencyController.getCurrencies);
app.get("/api/history", currencyController.getHistory);

app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
});

export default app;
