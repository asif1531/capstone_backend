import express from "express";
import {
  acceptMeetingRequestHandler,
  rejectMeetingRequestHandler,
  createMeetingHandler,
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

router.post("/api/meetings", authenticate, createMeetingHandler);

router.put(
  "/api/meetings/:meetingId/accept",
  authenticate,
  acceptMeetingRequestHandler
);

router.put(
  "/api/meetings/:id/reject",
  authenticate,
  rejectMeetingRequestHandler
);

export { router as routes };
