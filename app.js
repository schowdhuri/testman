const path = require("path");
const express = require("express");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressWetland = require("express-wetland");
const passport = require("passport");
const { Wetland }  = require("wetland");

const wetlandConfig = require("./wetland");
const routes = require("./server/routes");
const AuthController = require("./server/controllers/AuthController");

const {
    STATIC_DIR,
    STATIC_DIR_ALIAS,
    UPLOAD_DIR,
    UPLOAD_DIR_ALIAS
} = require("./server/constants/paths");

const PORT = 3200;

const app = express();
const wetland = new Wetland(wetlandConfig);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(UPLOAD_DIR_ALIAS, express.static(UPLOAD_DIR));
app.use(STATIC_DIR_ALIAS, express.static(STATIC_DIR));
app.use(cookieParser());
app.use(expressWetland(wetland));

// express session
app.use(expressSession({
    secret: "brokenrecord",
    resave: false,
    saveUninitialized: false
}));
// auth setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(AuthController.createStrategy(wetland));
passport.serializeUser(AuthController.serializeUser);
passport.deserializeUser(AuthController.createDeserializer(wetland));

// view engine
app.set("views", path.join(__dirname, "server", "views"));
app.set("view engine", "pug");

// Routes
routes(app);

// Start!
app.listen(PORT, "127.0.0.1", () => {
    console.log(`Server running on PORT ${PORT}`);
});
