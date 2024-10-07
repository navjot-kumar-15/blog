import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.js";
import { config } from "dotenv";
import { ConnectDB } from "./config/db.js";

config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/user", userRoutes);
// Database
// ConnectDB();

// Listner
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
