/**
 * @file passport-setup.js
 * @description Configures Passport for Google OAuth 2.0 authentication, including separate strategies for
 * Google signup and login, as well as user serialization and deserialization for session management.
 * This file integrates Google OAuth into the application, allowing users to sign up or log in
 * using their Google accounts. It also handles the retrieval and storage of user information.
 * @module passportSetup
 * @requires passport
 * @requires passport-google-oauth20
 * @requires User - Mongoose user model
 * @requires dotenv
 */

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User"); // Import User model for database interaction
require("dotenv").config(); // Load environment variables from .env file

/** ---------------------- USER SERIALIZERS ----------------------
 * Serializes user information into a session-storable format, allowing for session-based
 * authentication. Deserialization retrieves user information from session data.
 */

/**
 * Serializes user information into a session-storable format.
 * @function serializeUser
 * @param {Object} user - The user object to serialize.
 * @param {Function} done - Callback to signal completion, passing user id, email, and role.
 */
passport.serializeUser((user, done) => {
  done(null, { id: user._id, email: user.email, role: user.role });
});

/**
 * Deserializes user information from stored session data.
 * @function deserializeUser
 * @param {Object} obj - Serialized user data from the session.
 * @param {Function} done - Callback to signal completion, passing the full user object.
 */
passport.deserializeUser((obj, done) => {
  User.findById(obj.id).then((user) => {
    done(null, user);
  });
});

/** ---------------------- GOOGLE STRATEGIES ----------------------
 * Defines Passport Google strategies for signup and login, allowing users to authenticate
 * with Google accounts. Users can sign up if not already registered or log in if registered.
 */

/**
 * Google Signup Strategy - Registers a new user with Google OAuth.
 * @strategy google-signup
 * @type {passport.Strategy}
 */
passport.use(
  "google-signup",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/signup/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check for an existing user by email
        let existingUser = await User.findOne({
          email: profile.emails[0].value,
        });
        if (existingUser) {
          // If existing user lacks a Google ID, update user with Google data
          if (!existingUser.googleId) {
            existingUser = await User.findOneAndUpdate(
              { email: profile.emails[0].value },
              {
                $set: {
                  googleId: profile.id,
                  thumbnail: profile.photos[0].value,
                  firstName: profile.name.givenName,
                  lastName: profile.name.familyName,
                  isVerified: true,
                },
              },
              { new: true }
            );
            return done(null, existingUser);
          } else {
            return done(null, false, {
              message: "User already exists. Please log in.",
            });
          }
        } else {
          // If no user exists, create a new user in the database
          const newUser = new User({
            googleId: profile.id,
            username: profile.displayName,
            thumbnail: profile.photos[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            isVerified: true,
            email: profile.emails[0].value,
          });
          await newUser.save();
          done(null, newUser);
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

/**
 * Google Login Strategy - Authenticates existing users with Google OAuth.
 * @strategy google-login
 * @type {passport.Strategy}
 */
passport.use(
  "google-login",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/login/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Search for a user by Google ID
        let existingUser = await User.findOne({
          googleId: profile.id,
          isBlocked: false,
        });

        if (existingUser) {
          return done(null, existingUser); // Return user if found and not blocked
        }

        // If no Google ID match, search by email
        existingUser = await User.findOne({
          email: profile.emails[0].value,
          isBlocked: false,
        });

        if (existingUser) {
          // Update user with Google ID and thumbnail, then return user
          existingUser.googleId = profile.id;
          existingUser.thumbnail = profile.photos[0].value;
          await existingUser.save();
          return done(null, existingUser);
        } else {
          // User not found or blocked
          return done(null, false, {
            message: "User does not exist or blocked. Please sign up.",
          });
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

/** ---------------------- GOOGLE STRATEGIES ---------------------- */
