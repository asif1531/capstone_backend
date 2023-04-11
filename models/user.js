import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    phonNumber: {
      type: String,
      required: true,
      // unique: true,
      // uniqueCaseInsensitive: true,
      // unique: [true, "Mobile Number is already exist"],
    },
    otp: {
      type: String,
      // required: true,
    },
    Location: {
      lat: String,
      long: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
