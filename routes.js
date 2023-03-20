import express from "express";
import {
  acceptMeetingRequestHandler,
  rejectMeetingRequestHandler,
  sendMeetingRequestHandler,
} from "./controllers/meetingController.js";
import {
  createUserHandler,
  fetchAllUsersHandler,
  sendOTPHandler,
  verifyOTPHandler,
} from "./controllers/userController.js";
import { authenticate } from "./auth.js";

const router = express.Router();

router.get("/api/allUsers", fetchAllUsersHandler);
router.post("/api/signUp", createUserHandler);
router.post("/api/signIn", sendOTPHandler);
router.post("/api/verifyOtp", verifyOTPHandler);

//Meetings routes

router.post("/api/meetings", authenticate, sendMeetingRequestHandler);

router.patch(
  "/api/meetings/:id/accept",
  authenticate,
  acceptMeetingRequestHandler
);

router.patch(
  "/api/meetings/:id/reject",
  authenticate,
  rejectMeetingRequestHandler
);

export { router as routes };
