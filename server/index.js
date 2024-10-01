require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./db.js");
const usersRoutes = require("./routes/user.route.js");
const contactRoutes = require("./routes/email.route.js");
const authRoutes = require("./routes/auth.route.js");
const jobOffers = require("./routes/offers.route.js");
const mealsRoutes = require("./routes/meal.route.js");
const mealPlanRoutes = require("./routes/mealPlan.route.js");
const workoutPlanRoutes = require("./routes/workoutPlan.route.js");
const workoutRoutes = require("./routes/workout.route.js");

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        frameSrc: ["'self'", "data:"],
        scriptSrc: ["'self'"],
        frameAncestors: ["'self'"],
      },
    },
    frameguard: { action: "deny" },
    hsts: {
      maxAge: 31536000, // One year in seconds
      includeSubDomains: true,
      preload: true,
    },
    referrerPolicy: { policy: "no-referrer" },
  })
);

app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use((req, res, next) => {
  res.removeHeader("Server");
  next();
});

// Enable CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
});
app.use(limiter);

app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use('/workoutVideos', express.static(path.join(__dirname, 'public', 'workoutVideos')));

app.use("/auth", authRoutes);
app.use("/contact", contactRoutes);
app.use("/job", jobOffers);
app.use("/client", usersRoutes);
app.use("/meals", mealsRoutes);
app.use("/meal-planner", mealPlanRoutes);
app.use("/workouts", workoutRoutes);
app.use("/workout-planner", workoutPlanRoutes);

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is now live.");
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });