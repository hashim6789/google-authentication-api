/**
 * @file index.js
 * @description Main entry point for the Express application.
 * This file initializes the server, configures middleware, and sets up routes for the application.
 * @requires express
 * @requires path
 * @requires dotenv
 * @requires express-session
 * @requires passport
 * @requires uuid
 * @requires connectDB
 * @requires authRoutes
 * @requires homeRoutes
 */

const express = require("express"); // Import the express framework
const path = require("path"); // Import the path module for handling file paths
// const morgan = require("morgan"); // Uncomment for HTTP request logging
require("dotenv").config(); // Load environment variables from .env file
require("./config/passport-setup"); // Initialize Passport configuration
const session = require("express-session"); // Import express-session for session handling
const passport = require("passport"); // Import Passport for authentication
const { v4: uuidv4 } = require("uuid"); // Import uuid for generating unique session IDs
const connectDB = require("./config/db"); // Import the database connection function

const authRouter = require("./routes/authRoutes"); // Import authentication routes
const homeRouter = require("./routes/homeRoutes"); // Import home routes

const app = express(); // Create an Express application

// Set the port number
const port = process.env.PORT || 3000; // Default to port 3000 if not specified
const domain = process.env.DOMAIN_NAME; // Domain name from environment variables

// Connect to MongoDB
connectDB();

// Set up the view engine (EJS)
app.set("views", path.join(__dirname, "views")); // Specify the views directory
app.set("view engine", "ejs"); // Set EJS as the templating engine

// Middleware configuration
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// Session handling middleware
app.use(
  session({
    secret: uuidv4(), // Use a unique session ID
    resave: false, // Prevent session re-saving if unmodified
    saveUninitialized: false, // Do not save uninitialized sessions
  })
);

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Cache control middleware
app.use((req, res, next) => {
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  res.set("Surrogate-Control", "no-store");
  next(); // Call the next middleware in the stack
});

// Middleware to serve static files
app.use("/public", express.static(path.join(__dirname, "public"))); // Serve static files from the public directory

// Uncomment to use morgan for request logging
// app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

// Define application routes
app.use("/auth", authRouter); // Authentication routes
app.use("/", homeRouter); // Home routes

// Catch 404 errors and forward to error handler
app.use((req, res, next) => {
  res.status(404).render("_404"); // Render 404 error page
});

// Start the server
app.listen(port, () => {
  console.log(`The server started at ${domain}:${port}`); // Log the server start message
});
