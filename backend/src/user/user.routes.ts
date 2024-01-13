import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

import User from "./user.model";

const router = express.Router();

router.post(
  "/register",
  [
    check("firstName", "Firstname is required.").isString(),
    check("lastName", "Lastname is required.").isString(),
    check("email", "Email is required.").isEmail(),
    check("password", "Password must be at least 8 charactes.").isLength({
      min: 3,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array() });

    try {
      let user = await User.findOne({ email: req.body.email });

      if (user)
        return res.status(400).json({ message: "User already exists!" });

      user = new User(req.body);

      await user.save();

      const token = jwt.sign(
        {
          user_id: user.id,
        },
        process.env.JWT_SECRET_KEY!,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000, // 1 day
      });

      return res.sendStatus(200);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong!" });
    }
  }
);

export default router;
