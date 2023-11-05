import { Request, Response, NextFunction } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
export interface CustomRequest extends Request {
  userId?: string;
}
const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      const decodedData: JwtPayload | string = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY as Secret
      );
      req.userId = (decodedData as JwtPayload)?.id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
