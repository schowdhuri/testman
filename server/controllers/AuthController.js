const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const userController = require("./UserController");

const APP_ID = "890243396907-v2beikeggrqe8htni9vhcqg6vibbf6ji.apps.googleusercontent.com";
const APP_SECRET = "KlTtma0hqyHFy2KwRgRdbB9x";

const createStrategy = wetland => new GoogleStrategy({
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
);

const serializeUser = (user, cb) => {
    cb(null, user.id);
};

const createDeserializer = wetland => {
    return (id, cb) => {
        userController.findById(id, wetland)
            .then(user => cb(null, user));
    };
};

const isAuthenticated = (req, res, next) => {
    if(req.user) {
        return next();
    }
    res.redirect("/login");
};

module.exports = {
    createStrategy,
    serializeUser,
    createDeserializer,
    isAuthenticated
};
