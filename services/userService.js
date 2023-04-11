import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

export async function fetchAllUsers() {
  return await User.find({});
}

export async function createUser(data) {
  const existingUser = await User.findOne({ phonNumber: data.phonNumber });
  if (existingUser) {
    return { status: "Error", message: "Mobile Number already exists" };
    // throw new Error("Mobile Number already exists");
  }
  if (data.phonNumber !== Number && data.phonNumber.length < 10) {
    return {
      status: "Error",
      message: "Please Enter Valid 10 digit Phone Number",
    };
  }
  if (data.phonNumber.length > 10) {
    return {
      status: "Error",
      message: "Please Enter Valid 10 digit Phone Number",
    };
  }
  let users = [];
  users.push(data);
  return await User.insertMany(data);
}

export async function sendOTPService(phonNumber) {
  try {
    const user = await User.findOne({ phonNumber });
    if (!user) {
      return {
        status: "Error",
        message: "Mobile Number does not exist! Please register to continue",
      };
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const hashedOTP = await bcrypt.hash(otp, 10);

    user.otp = hashedOTP;
    await user.save();

    const message = `Your OTP for verification is: ${otp}`;

    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      // to: phonNumber,
      to: `+91${phonNumber}`,
    });

    return otp;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send OTP", error);
  }
}

export async function verifyOTPService(phonNumber, otp) {
  try {
    const user = await User.findOne({ phonNumber: phonNumber });
    if (!user) {
      return {
        status: "Error",
        message: "User Does not exist",
      };
    }

    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch) {
      return {
        status: "Error",
        message: "OTP is not matched",
      };
      // throw new Error("Invalid OTP");
    }

    const token = jwt.sign(
      { name: user.username },
      `${process.env.JWT_SECRET_KEY}`,
      { expiresIn: "1h" }
    );

    let datatosend = {
      fname: user.fname,
      phonNumber: user.phonNumber,
      _id: user._id,
      token: token,
    };
    return { success: "Success", message: datatosend };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
