import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import userFollowRoutes from "./routes/userfollowed.js";
import likeRoutes from "./routes/like.js";
import { config } from "dotenv";
import { ConnectDB } from "./config/db.js";

config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("./uploads"));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/userfollow", userFollowRoutes);
app.use("/api/like", likeRoutes);
// Database
// ConnectDB();

// Listner
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
