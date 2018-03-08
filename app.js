const path = require("path");
const express = require("express");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressWetland = require("express-wetland");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { Wetland }  = require("wetland");

const wetlandConfig = require("./wetland");

const routes = require("./server/routes");

const userController = require("./server/controllers/UserController");

const PORT = 3200;

const app = express();

const APP_ID = "890243396907-v2beikeggrqe8htni9vhcqg6vibbf6ji.apps.googleusercontent.com";
const APP_SECRET = "KlTtma0hqyHFy2KwRgRdbB9x";

const wetland = new Wetland(wetlandConfig);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressWetland(wetland));
app.use("/static", express.static(path.join(__dirname, "client", "dist")));
app.use(cookieParser());
// express session
app.use(expressSession({
    secret: "brokenrecord",
    resave: false,
    saveUninitialized: false
}));
// passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new GoogleStrategy({
        clientID: APP_ID,
        clientSecret: APP_SECRET,
        callbackURL: "http://localhost:3200/auth/google/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
        // console.log(profile);
        userController.findOrCreate(
            profile.id,
            profile.emails[0].value,
            profile.displayName,
            wetland
        ).then(user => cb(null, user));
    }
));
// serz/deserz passport user from express session
passport.serializeUser((user, cb) => {
    cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
    userController.findById(id, wetland)
        .then(user => cb(null, user));
});

// view engine
app.set("views", path.join(__dirname, "server", "views"));
app.set("view engine", "pug");

// Routes
routes(app);

// Start!
app.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`);
});
