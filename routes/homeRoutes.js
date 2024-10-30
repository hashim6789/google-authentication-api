/**
 * @file homeRoutes.js
 * @description Express router for the home route.
 * This module handles rendering the home page and passing user information and error messages to the view.
 * @module homeRoutes
 * @requires express
 */

const express = require("express");

// Create an Express router instance
const router = express.Router();

/** ----------------- Home Route ----------------- */

/**
 * Route for rendering the home page.
 * Retrieves the authenticated user information and any error messages from the session.
 * @name get/
 * @function
 * @memberof module:homeRoutes
 * @param {Object} req - The request object containing user and session data.
 * @param {Object} res - The response object for sending the rendered view.
 * @returns {void}
 */
router.get("/", (req, res) => {
  const user = req.user; // Retrieve the authenticated user from the request
  const error = req.session.error; // Retrieve any error message from the session
  delete req.session.error; // Clear the error message from the session

  console.log("user =", user); // Log the user information for debugging
  res.render("home", { user, error }); // Render the home view, passing user and error data
});

// Export the router for use in the main application
module.exports = router;
