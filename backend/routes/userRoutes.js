import express from "express";
import {
  loginUser,
  registerUser,
  getUserProfile,
  googleAuth,
  addAddress,
  editAddress,
  fetchAddressList,
  deleteAddress,
  resetPassword,
  profileUpdate,
} from "../controller/userController.js";
import {
  resetForgetPassword,
  forgotPassword,
} from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/googleAuth", googleAuth);
router.route("/profile").get(protect, getUserProfile);

router.route("/addAddress").post(protect, addAddress);
router.route("/editAddress").post(protect, editAddress);
router.route("/deleteAddress").post(protect, deleteAddress);
router.route("/fetchAddressList").get(protect, fetchAddressList);
router.route("/resetPassword").patch(protect, resetPassword);
router.route("/updateProfile").patch(protect, profileUpdate);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetForgetPassword/:token").patch(resetForgetPassword);

export default router;
