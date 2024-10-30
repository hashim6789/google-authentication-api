/**
 * @file authController.js
 * @description Controller functions for handling user authentication with Google OAuth, including
 * signup, login, and logout functionalities. The module exports middleware for Google OAuth
 * strategies and callback functions, as well as logout handling.
 * @module authController
 * @requires passport
 */

const passport = require("passport");

/** ----------------- Google Signup and Login --------------- */

/**
 * Middleware to initiate Google signup authentication.
 * @function googleSignup
 * @returns {Function} - Middleware that starts the "google-signup" authentication process.
 */
const googleSignup = passport.authenticate("google-signup", {
  scope: ["profile", "email"],
});

/**
 * Middleware to initiate Google login authentication.
 * @function googleLogin
 * @returns {Function} - Middleware that starts the "google-login" authentication process.
 */
const googleLogin = passport.authenticate("google-login", {
  scope: ["profile", "email"],
});

/**
 * Callback function for Google signup, handling success and failure redirects.
 * @function googleSignupCallback
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const googleSignupCallback = (req, res, next) => {
  passport.authenticate(
    "google-signup",
    {
      failureRedirect: "/",
      failureFlash: true,
    },
    (err, user, info) => {
      if (err) {
        return next(err); // Handle authentication error
      }
      if (!user) {
        req.session.error = info.message; // Flash message if no user is found
        return res.redirect("/"); // Redirect to homepage on failure
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect("/"); // Redirect to homepage on success
      });
    }
  )(req, res, next);
};

/**
 * Callback function for Google login, handling success and failure redirects.
 * @function googleLoginCallback
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const googleLoginCallback = (req, res, next) => {
  passport.authenticate(
    "google-login",
    {
      failureRedirect: "/",
      failureFlash: true,
    },
    (err, user, info) => {
      if (err) {
        return next(err); // Handle authentication error
      }
      if (!user) {
        req.session.error = info.message; // Flash message if no user is found
        return res.redirect("/"); // Redirect to homepage on failure
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect("/"); // Redirect to homepage on success
      });
    }
  )(req, res, next);
};

/**
 * Logs the user out, destroys session, clears cookies, and redirects to homepage.
 * @function logout
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const logout = (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        return next(err); // Handle logout error
      }

      req.session.destroy((err) => {
        if (err) {
          return next(err); // Handle session destruction error
        }

        res.clearCookie("connect.sid"); // Clear session cookie
        res.redirect("/"); // Redirect to homepage after logout
      });
    });
  } catch (err) {
    // Render the _500.ejs page on server error
    res.status(500).render("_500");
  }
};

// Exporting authentication functions for use in routes
module.exports = {
  googleLogin,
  googleLoginCallback,
  googleSignup,
  googleSignupCallback,
  logout,
};
