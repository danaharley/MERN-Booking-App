import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookiePrser from "cookie-parser";

import userRoutes from "./user/user.routes";
import authRoutes from "./auth/auth.routes";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING!);

const app = express();
app.use(cookiePrser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(3001, () => console.log("server running on port 3001"));
