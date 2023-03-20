import mongoose from "mongoose";
import User from "./user.js";

const inviteesSchema = new mongoose.Schema({
  meetingID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Meeting",
    required: true,
  },
  status: {
    type: {
      status: {
        accept: String,
        reject: String,
      },
    },
    required: false,
  },
});

const Invitees = mongoose.model("Invitees", inviteesSchema);

export default Invitees;
