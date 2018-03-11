const passport = require("passport");
const controller = require("../controllers/AuthController");

const authRoutes = app => {
    app.route("/auth/google")
        .get(
            passport.authenticate("google", {
                scope: [ "profile email" ]
            })
        );

    app.route("/auth/google/callback")
        .get(
            passport.authenticate("google", {
                failureRedirect: "/login"
            }),
            (req, res) => res.redirect("/")
        );

    app.route("/")
        .get(
            controller.isAuthenticated,
            (req, res, next) => next()
        );

    app.route("/api/*")
        .all(
            controller.isAuthenticated,
            (req, res, next) => next()
        );
};

module.exports = authRoutes;
