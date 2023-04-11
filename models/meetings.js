import mongoose from "mongoose";

const { Schema } = mongoose;

const meetingSchema = new Schema(
  {
    meetingName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    requesterId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    startDateTime: {
      type: Number,
      required: false,
    },
    endDateTime: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    timeStatus: {
      type: String,
      trim: true,
    },
  },

  { timestamps: true }
);

const Meeting = mongoose.model("Meeting", meetingSchema);

export default Meeting;
