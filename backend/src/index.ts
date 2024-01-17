import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookiePrser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import userRoutes from "./user/user.routes";
import authRoutes from "./auth/auth.routes";
import myHotelsRoutes from "./hotels/my-hotels";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING!);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cookiePrser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelsRoutes);

app.listen(3001, () => console.log("server running on port 3001"));
