const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const userController = require("./UserController");

const OAUTH_CB_ROOT = require("../constants/paths").OAUTH_CB_ROOT;

const APP_ID = process.env.GOOGLE_OAUTH_APP_ID;
const APP_SECRET = process.env.GOOGLE_OAUTH_APP_SECRET;

const createStrategy = wetland => new GoogleStrategy({
    clientID: APP_ID,
    clientSecret: APP_SECRET,
    callbackURL: `${OAUTH_CB_ROOT}/auth/google/callback`
},
(accessToken, refreshToken, profile, cb) => {
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

const isAuthenticated = req => Boolean(req.user);

module.exports = {
    createStrategy,
    serializeUser,
    createDeserializer,
    isAuthenticated
};
