/**
 * @file authRoutes.js
 * @description Express router for authentication-related routes using Google OAuth.
 * This module defines the routes for user signup, login, and logout functionalities.
 * It uses the Passport.js authentication middleware for handling OAuth processes.
 * @module authRoutes
 * @requires express
 * @requires ../controllers/authController
 */

const express = require("express");
const {
  googleLogin,
  googleLoginCallback,
  googleSignup,
  googleSignupCallback,
  logout,
} = require("../controllers/authController");

// Create an Express router instance
const router = express.Router();

/** ----------------- Google Authentication Routes ----------------- */

/**
 * Route for initiating Google signup.
 * Redirects users to the Google authentication page for signup.
 * @name get/google/signup
 * @function
 * @memberof module:authRoutes
 * @see module:authController.googleSignup
 */
router.get("/google/signup", googleSignup);

/**
 * Route for initiating Google login.
 * Redirects users to the Google authentication page for login.
 * @name get/google/login
 * @function
 * @memberof module:authRoutes
 * @see module:authController.googleLogin
 */
router.get("/google/login", googleLogin);

/**
 * Route for handling the callback from Google after signup.
 * Processes the authentication response and logs the user in or redirects on failure.
 * @name get/google/signup/callback
 * @function
 * @memberof module:authRoutes
 * @see module:authController.googleSignupCallback
 */
router.get("/google/signup/callback", googleSignupCallback);

/**
 * Route for handling the callback from Google after login.
 * Processes the authentication response and logs the user in or redirects on failure.
 * @name get/google/login/callback
 * @function
 * @memberof module:authRoutes
 * @see module:authController.googleLoginCallback
 */
router.get("/google/login/callback", googleLoginCallback);

/**
 * Route for logging out the user.
 * Ends the user session and redirects to the home page.
 * @name get/logout
 * @function
 * @memberof module:authRoutes
 * @see module:authController.logout
 */
router.get("/logout", logout);

// Export the router for use in the main application
module.exports = router;
