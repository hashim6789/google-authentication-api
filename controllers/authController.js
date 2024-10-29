// const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const UserModel = require("../models/User");

/**-----------------google signup and login--------------- */

const googleSignup = passport.authenticate("google-signup", {
  scope: ["profile", "email"],
});

const googleLogin = passport.authenticate("google-login", {
  scope: ["profile", "email"],
});

//googleSignupCallback
const googleSignupCallback = (req, res, next) => {
  passport.authenticate("google-signup", {
    failureRedirect: "/",
  })(req, res, next);
};

//googleLoginCallback
const googleLoginCallback = (req, res, next) => {
  passport.authenticate("google-login", {
    failureRedirect: `/`,
  })(req, res, next);
};

//for redirect the home page after google login and google signup
const redirectToProfile = (req, res) => {
  try {
    console.log("HI", req.session.returnTo);
    res.redirect("/");
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: "The server error",
    });
  }
};

/**------------------logout the user----------------- */

const logout = (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        return next(err);
      }

      req.session.destroy((err) => {
        if (err) {
          return next(err);
        }

        res.clearCookie("connect.sid");
        res.redirect("/");
      });
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: "The server error",
    });
  }
};

module.exports = {
  googleLogin,
  googleLoginCallback,
  googleSignup,
  googleSignupCallback,
  redirectToProfile,
  logout,
};
