if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("./config/passport");

const api = require("./routes");
const { getUser } = require("./helpers/_helpers");

const app = express();
const port = process.env.PORT || 8080;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000", // Development
  "https://cafeteria-staff-frontend.vercel.app", // Production
  "https://cafeteria-frontend-chi.vercel.app",
  "https://api.imgur.com/3/image",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use("/upload", express.static(path.join(__dirname, "upload")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use((req, res, next) => {
  res.locals.user = getUser(req);
  next();
});

app.use("/api", api);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
