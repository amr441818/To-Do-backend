import { Response, Request, NextFunction } from "express";
import prisma from "../../prisma/index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationErrors } from "../middlewares/errorHandling";
//types
type SignUpRequestBody = { name: string; email: string; password: string };
type SignInRequestBody = { email: string; password: string };
import {
  expectedErrorHandling,
  serverSideErrorHandling,
} from "../middlewares/errorHandling";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validationErrors(req, next);
    const { name, email, password } = req.body as SignUpRequestBody;
    console.log(name, email, password);
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      //   return res.status(401).json({ message: "User already exists" });
      expectedErrorHandling("User already exists", 400);
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await prisma.user.create({
      data: {
        name: name,
        password: hashPassword,
        email: email,
      },
    });

    const token = jwt.sign(
      {
        email: newUser.email,
        name: newUser.name,
        id: newUser.id.toString(),
      },
      `${process.env.JWT_SECRET_KEY}`,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    serverSideErrorHandling(error, next);
  }
};

export const logIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validationErrors(req, next);
  const { email, password } = req.body as SignInRequestBody;
  try {
    const userDoc = await prisma.user.findUnique({ where: { email } });
    if (!userDoc) {
      expectedErrorHandling("Email does not exist", 404);
    }

    if (userDoc) {
      const isEqual = await bcrypt.compare(password, userDoc.password);
      if (!isEqual) {
        expectedErrorHandling("password wrong", 403);
      }
      const token = jwt.sign(
        {
          email: userDoc.email,
          name: userDoc.name,
          id: userDoc.id.toString(),
        },
        `${process.env.JWT_SECRET_KEY}`,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token });
    }
  } catch (error) {
    serverSideErrorHandling(error, next);
  }
};
