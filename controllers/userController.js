import jwt from "jsonwebtoken";
import {
  createUser,
  fetchAllUsers,
  sendOTPService,
  verifyOTPService,
} from "../services/userService.js";

export async function fetchAllUsersHandler(req, res) {
  try {
    const user = await fetchAllUsers();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send("Failed to fetch all user", err);
  }
}

export async function getUserByIdController(req, res) {
  // let id=req.body
  try {
    let user = await getUserById(req.body);
    return res.status(200).send(user);
  } catch (e) {
    return res.status(500).send("Error while geting User id of ", e);
  }
}

// export async function createUserHandler(req, res) {
//   try {
//     const user = await createUser(req.body);
//     if (user.status === "error") {
//       return res.status(401).json({ message: user.message });
//     } else {
//       return res.status(200).json(user);
//     }
//   } catch (err) {
//     res.status(500).json("Error While Creating User", err);
//   }
// }

export async function createUserHandler(req, res) {
  try {
    const user = await createUser(req.body);
    if (user.status === "error") {
      return res.status(401).send(user.message);
    } else {
      return res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json(`Error While Creating User ${err}`);
  }
}

export async function sendOTPHandler(req, res) {
  try {
    const { phonNumber } = req.body;
    if (!phonNumber) {
      return res
        .status(400)
        .json({ message: "Phone number is required to send OTP" });
    }

    const result = await sendOTPService(phonNumber);

    return res.status(200).json({ message: result });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while sending OTP" });
  }
}

export async function verifyOTPHandler(req, res) {
  try {
    const { phonNumber, otp } = req.body;

    if (!phonNumber) {
      return res
        .status(400)
        .json({ message: "Phone number is required to verify OTP" });
    }

    if (!otp) {
      return res.status(400).json({ message: "OTP is required to verify OTP" });
    }

    const user = await verifyOTPService(phonNumber, otp);
    if (user.status === "error") {
      return res.status(401).send(user.message);
    } else {
      return res
        .status(200)
        .json({ message: "OTP verifies successfully", status: user.message });
    }

    // if (!user) {
    //   return res.status(400).json({ message: "Invalid OTP" });
    // }

    // const token = jwt.sign({ name: user.name }, process.env.JWT_SECRET_KEY, {
    //   expiresIn: "1d",
    // });

    // return res
    //   .status(200)
    //   .json({ message: "OTP verified successfully", token });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while verifying OTP" });
  }
}
