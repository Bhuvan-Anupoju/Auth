import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

// To genrerate OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const currentOTPs = {};

export const sendEmail = async (email, otp) => {
  try {
    console.log("Email to be sent:", email);

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP for Password Reset",
      html: `<h1>Hi this is Your OTP : ${otp} to reset password. Please Dont share it with anyone</h1>`,
    });

    return "OTP sent successfully";
  } catch (error) {
    console.log(error);
    throw new Error("Could not send OTP");
  }
};

// Generate JWT token
export const accessTokenSecret = process.env.JWT_SECRET;
export function generateJWT(user) {
  return jwt.sign(user, accessTokenSecret, {
    expiresIn: "15min",
  });
}
