const express = require("express");
const { handleSignup, handleSignin, handleVerifyOtp ,getAllLogedInUser} = require("../controller/auth");

const router = express.Router();
router.post("/signup",  (req, res) => {
  handleSignup(req, res);
});
router.get("/", async (req, res) => {
  return res.json({ success: true })
});
router.get("/users", async (req, res) => {
  getAllLogedInUser(req,res)
});
router.post("/signin", async (req, res) => {
  handleSignin(req, res);
});
router.post("/verifyotp", async (req, res) => {
  handleVerifyOtp(req, res);
});
module.exports = router;
