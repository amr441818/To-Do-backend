import express from "express";
const router = express.Router();
import { signUp, logIn } from "../controllers/user";
import { emailValidation } from "../middlewares/errorHandling";

router.post("/signUp", emailValidation("signUp"), signUp);
router.post("/logIn", emailValidation("signIn"), logIn);
export default router;
