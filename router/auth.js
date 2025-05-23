const express = require("express");
const { handleSignup, handleSignin, handleVerifyOtp, getAllLogedInUser,handleverifyEmailAndSendOtp,handleverifyforgototp ,handlechangepassword} = require("../controller/auth");

const router = express.Router();
router.post("/signup", (req, res) => {
  handleSignup(req, res);
});
router.get("/", async (req, res) => {
  return res.json({ success: true })
});
router.get("/users", async (req, res) => {
  getAllLogedInUser(req, res)
});
router.post("/signin", async (req, res) => {
  handleSignin(req, res);
});
// new user singed verify otp
router.post("/verifyotp", async (req, res) => {
  handleVerifyOtp(req, res);
});
// verify email and sent otp
router.post("/sendforgototp", async (req, res) => {
  handleverifyEmailAndSendOtp(req, res);
  // verifyEmailAndSendOtp
});
router.post("/verifyforgototp", async (req, res) => {
  handleverifyforgototp(req, res);
});
router.post("/forgotpassword", async (req, res) => {
  handlechangepassword(req, res);
});
module.exports = router;
