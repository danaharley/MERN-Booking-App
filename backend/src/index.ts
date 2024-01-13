import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import userRoutes from "./user/user.routes";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING!);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", userRoutes);

app.listen(3001, () => console.log("server running on port 3001"));
