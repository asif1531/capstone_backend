import express from "express";
import {
  createUserHandler,
  sendOTPHandler,
  verifyOTPHandler,
} from "./controllers/userController.js";

const router = express.Router();

router.post("/api/signUp", createUserHandler);
router.post("/api/signIn", sendOTPHandler);
router.post("/api/verifyOtp", verifyOTPHandler);

export { router as routes };
