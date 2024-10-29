const express = require("express");
const {
  googleLogin,
  googleLoginCallback,
  googleSignup,
  googleSignupCallback,
  redirectToProfile,
  logout,
} = require("../controllers/authController");
const router = express.Router();

// Auth with Google for signup
router.get("/google/signup", googleSignup);

// Auth with Google for login
router.get("/google/login", googleLogin);

// Callback route for Google to redirect to for signup
router.get(
  "/google/signup/callback",

  googleSignupCallback,
  redirectToProfile
);

// Callback route for Google to redirect to for login
router.get(
  "/google/login/callback",

  googleLoginCallback,
  redirectToProfile
);

//for logout
router.get("/logout", logout);

module.exports = router;
