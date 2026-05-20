import { Router } from "express";
import JWTVerficatonMiddleware from "../middlewares/JWT.middleware.js";
import {
  forgotPassword,
  loginUser,
  registerUser,
  updatePassword,
  verifyOTP,
  getUserProfile,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.post("/forgotPassword", forgotPassword);
router.post("/verifyOTP", verifyOTP);
router.post("/updatePassword", updatePassword);
router.get("/getUserProfile", JWTVerficatonMiddleware, getUserProfile);

export default router;
