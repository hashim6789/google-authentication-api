const express = require("express"); //import the express
const path = require("path");
// const morgan = require("morgan");
require("dotenv").config();
require("./config/passport-setup");
const session = require("express-session"); //import session
const passport = require("passport");
const { v4: uuidv4 } = require("uuid"); //import unique id
const connectDB = require("./config/db");

const authRouter = require("./routes/authRoutes");
const homeRouter = require("./routes/homeRoutes");

const app = express();

//for port number
const port = process.env.PORT || 3000;
const domain = process.env.DOMAIN_NAME;

// connect with mongoDB
connectDB();

//for setting view engine (ejs)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//middlewares
app.use(express.json()); //for parse to json
app.use(express.urlencoded({ extended: true })); // for url encode

// session handling
app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

//for cache handling
app.use((req, res, next) => {
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  res.set("Surrogate-Control", "no-store");
  next();
});

// Middleware to serve static files
app.use("/public", express.static(path.join(__dirname, "public")));

//for morgan middleware for auditing the requests
// app.use(
//   morgan(":method :url :status :res[content-length] - :response-time ms")
// );

app.use("/auth", authRouter); // for authentication router url
app.use("/", homeRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).render("_404");
});

//server listener
app.listen(port, () => {
  console.log(`The server started at ${domain}:${port}`);
});
