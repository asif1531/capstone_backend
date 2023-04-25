import express from "express";
import {
  // acceptMeetingRequestHandler,
  // rejectMeetingRequestHandler,
  createMeetingHandler,
  getAllMeetingController,
  updateMeetingStatusController,
  updatemeetingController,
} from "./controllers/meetingController.js";
import {
  // createUserController,
  createUserHandler,
  // createUserHandler,
  fetchAllUsersHandler,
  getUserByIdController,
  sendOTPHandler,
  verifyOTPHandler,
} from "./controllers/userController.js";
import { authenticate } from "./auth.js";
import { findLocationController } from "./controllers/locationController.js";
import { getAllInviteesController } from "./controllers/invitessController.js";

const router = express.Router();

//User Routes
router.get("/api/getallUsers", fetchAllUsersHandler);
router.post("/api/getUsers", getUserByIdController);
router.post("/api/createUser", createUserHandler);
router.post("/api/otpgenerator", sendOTPHandler);
router.post("/api/otpverification", verifyOTPHandler);
router.post("/api/getLocation", findLocationController);

//Meetings routes
router.get("/api/getAllMeetings", getAllMeetingController);
router.post("/api/createMeetings", authenticate, createMeetingHandler);
router.post(
  "/api/updateStatusMeeting",
  authenticate,
  updateMeetingStatusController
); //..........
router.post("/api/updateMeeting", authenticate, updatemeetingController);

// router.put(
//   "/api/meetings/:meetingId/accept",
//   authenticate,
//   acceptMeetingRequestHandler
// );

// router.put(
//   "/api/meetings/:id/reject",
//   authenticate,
//   rejectMeetingRequestHandler
// );

//Invitees
router.get("/api/getallInvitees", getAllInviteesController);

export { router as routes };
