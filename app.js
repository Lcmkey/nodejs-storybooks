const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const connectDB = require("./config/db");
const router = require("./routes");
const authRouter = require("./routes/auth");
const storiesRouter = require("./routes/stories");

// Load config
dotenv.config({ path: "./config/config.env" });

// Passport config
require("./config/passport")(passport);

connectDB();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { PORT = 5000, NODE_ENV } = process.env;

// Logging
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Handlebars
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

// Sessions
app.use(
  session({
    secret: "session_secret",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Router
app.use("/", router);
app.use("/auth", authRouter);
app.use("/stories", storiesRouter);

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
