require("dotenv").config();
const express = require("express");
const engine = require("ejs-mate");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const path = require("path");
const colors = require("colors");
const connectDB = require("./config/db");

// Import routes
const mainRoutes = require("./routes/mainRoutes");
const postsRoutes = require("./routes/postsRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(morgan("dev"));
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(cookieParser());

// Template engine setup
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Custom middleware
app.use((req, res, next) => {
  res.locals.url = req.originalUrl;
  next();
});

// Routes
app.use("/", mainRoutes);
app.use("/posts", postsRoutes);
app.use("/admin", adminRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
});
