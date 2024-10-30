/**
 * @file User.js
 * @description Mongoose schema and model for user data in the application.
 * This schema defines the structure and validation rules for user documents
 * in the MongoDB database, including properties for Google authentication,
 * personal information, and account status.
 * @module User
 * @requires mongoose
 */

const mongoose = require("mongoose");

// Destructure Schema from mongoose for easier usage
const { Schema } = mongoose;

/** ----------------- User Schema Definition ----------------- */

/**
 * UsersSchema defines the structure of user documents in MongoDB.
 * @constructor UsersSchema
 * @type {Schema}
 * @property {String} googleId - Unique identifier from Google (if applicable).
 * @property {String} thumbnail - URL of the user's profile picture.
 * @property {String} firstName - User's first name, required.
 * @property {String} lastName - User's last name.
 * @property {String} email - User's email address, required and unique.
 * @property {String} password - User's password (for non-Google accounts).
 * @property {Boolean} isBlocked - Indicates if the user is blocked (default: false).
 * @property {Boolean} isVerified - Indicates if the user's email is verified (default: false).
 * @property {Object} timestamps - Automatically adds `createdAt` and `updatedAt` fields.
 */
const UsersSchema = new Schema(
  {
    googleId: { type: String, default: null },
    thumbnail: { type: String, default: null },
    firstName: { type: String, default: "", required: true },
    lastName: { type: String, default: "" },
    email: { type: String, required: true },
    password: { type: String },
    isBlocked: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true } // Automatically create `createdAt` and `updatedAt` fields
);

/** ----------------- User Model Definition ----------------- */

/**
 * Users is the Mongoose model for user documents based on the UsersSchema.
 * It provides an interface for interacting with user data in the MongoDB database.
 * @type {Model}
 */
const Users = mongoose.model("Users", UsersSchema);

// Exporting the Users model for use in other modules
module.exports = Users;
