import mongoose from "mongoose";
import User from "./user.js";

const meetingSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
    required: false,
  },
  startDateTime: {
    type: Date,
    required: false,
  },
  endDateTime: {
    type: Date,
    required: false,
  },
});

const Meeting = mongoose.model("Meeting", meetingSchema);

export default Meeting;
