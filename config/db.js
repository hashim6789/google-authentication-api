/**
 * @file db.js
 * @description This file configures and establishes a connection to MongoDB using Mongoose.
 * The MongoDB URI is securely retrieved from environment variables, and error handling
 * ensures the application exits if the connection fails. This module exports the `connectDB`
 * function to initialize the database connection across the application.
 * @module db
 * @requires dotenv
 * @requires mongoose
 * @exports connectDB
 * @date 2024-10-30
 */

require("dotenv").config(); // Load environment variables from .env file
const mongoose = require("mongoose"); // Import Mongoose for MongoDB interaction

// MongoDB URI retrieved from environment variables (.env file)
const mongoDbUri = process.env.mongoDbUri;

/**
 * Connects to MongoDB using Mongoose.
 * @async
 * @function connectDB
 * @returns {Promise<void>} Resolves once the database connection is successfully established.
 * @throws {Error} Logs an error and exits the process if the connection attempt fails.
 *
 * @example
 * // To connect to MongoDB, simply import and call the connectDB function:
 * const connectDB = require('./db');
 * connectDB();
 */
const connectDB = async () => {
  try {
    // Connect to MongoDB with the retrieved URI
    await mongoose.connect(mongoDbUri);
    console.log("MongoDB connected successfully"); // Log successful connection
  } catch (err) {
    // Log an error message and exit the process if the connection fails
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit the application with a failure code
  }
};

// Export the connectDB function for use in other modules
module.exports = connectDB;
