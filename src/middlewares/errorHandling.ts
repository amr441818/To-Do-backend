import { NextFunction, Request } from "express";
import { body, validationResult } from "express-validator";
interface err extends Error {
  statusCode?: number;
  data?: {};
}
export const validationErrors = (req: Request, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    try {
      const err: err = new Error("validation failed");
      err.statusCode = 422;
      err.message = errors.array()[0].msg;
      throw err;
    } catch (error) {
      next(error);
    }
  }
};
export const emailValidation = (type: string) => {
  let validations;
  validations = [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("please enter a valid email"),
    body("password")
      .isLength({ min: 4 })
      .withMessage("password must be at least 6 characters"),
  ];
  if (type === "signUp") {
    validations.push(
      body("name").trim().not().isEmpty().withMessage("name must not be empty")
    );
  }
  return validations;
};

export const todoValidations = () => {
  return [
    body("text")
      .trim()
      .not()
      .isEmpty()
      .withMessage("goal text must not be empty"),
  ];
};
export const serverSideErrorHandling = (err: any, next: NextFunction) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
};

export const expectedErrorHandling = (message: string, statusCode: number) => {
  const err: err = new Error(message);
  err.statusCode = statusCode;
  throw err;
};
