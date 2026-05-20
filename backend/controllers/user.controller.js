import bcrypt from "bcrypt";
import pool from "../config/db.js";
import {
  generateOTP,
  currentOTPs,
  sendEmail,
  generateJWT,
} from "../utils/utils.js";

// Default Route
const defaultRoute = async (req, res) => {
  res.status(200).json({ message: "hi I am default route" });
};

// Register user
const registerUser = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = await pool.query(
    `insert into users(name,email,passwordHash) values("${name}","${email}","${passwordHash}")`,
  );

  res.status(201).json({ message: "Registered successful" });
};

// Login user
const loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await pool.query(`select * from  users where email='${email}'`);

  const passwordHash = user[0][0].passwordHash;
  const isPasswordCorrect = await bcrypt.compare(password, passwordHash);

  console.log("isPasswordCorrect", isPasswordCorrect);
  if (isPasswordCorrect) {
    const accessToken = generateJWT({
      email: user[0][0].email,
      name: user[0][0].name,
    });
    return res
      .status(200)
      .json({ userAuthenticated: true, accessToken: accessToken });
  }

  return res.status(404).json({ userAuthenticated: false });
};

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await pool.query(`select * from users where email='${email}'`);

    if (user[0].length === 0) {
      return res.status(404).json({ message: "User not registered yet" });
    }

    let generatedOTP = generateOTP();
    currentOTPs[email] = generatedOTP;

    await sendEmail(email, generatedOTP);

    console.log(currentOTPs);

    return res.status(200).json({ message: "OTP Sent successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Could not send OTP" });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  const { email, OTP } = req.body;
  if (Object.keys(currentOTPs).includes(email)) {
    if (currentOTPs[email] === OTP) {
      return res.status(200).json({ message: "OTP verfied Successfully" });
    } else {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  } else {
    res.status(404).json({ message: "OTP does not exist for this email" });
  }
};

// Update new Password
const updatePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const passwordHash = await bcrypt.hash(newPassword, 10);
    const DBResponse = await pool.query(
      `update users set passwordHash='${passwordHash}' where email='${email}'`,
    );
    res.status(200).json({ message: "Password Updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Problem updating your new password" });
  }
};

// User profile get data route (Restricted Route)
const getUserProfile = async (req, res) => {
  res.status(200).json({ message: "hi I am user profile data" });
};
export {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOTP,
  updatePassword,
  getUserProfile,
};
