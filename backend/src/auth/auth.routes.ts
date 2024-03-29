import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../user/user.model";

import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required.").isEmail(),
    check("password", "Password must be at least 3 charactes.").isLength({
      min: 3,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array() });

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user)
        return res.status(400).json({ message: "Invalid Credentials" });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(400).json({ message: "Invalid Credentials" });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY!, {
        expiresIn: "1d",
      });

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000, // 1 day
      });

      return res.status(200).json({ userId: user._id });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong!" });
    }
  }
);

router.delete("/logout", async (req: Request, res: Response) => {
  try {
    res.clearCookie("auth_token");

    return res
      .status(200)
      .json({ message: "You have been successfully logged out" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
});

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

export default router;
