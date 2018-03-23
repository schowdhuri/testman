const passport = require("passport");
const controller = require("../controllers/AuthController");

const authRoutes = app => {
    app.route("/auth/google")
        .get(
            passport.authenticate("google", {
                scope: [ "profile email" ]
            })
        );

    app.route("/logout")
        .get((req, res) => {
            req.logout();
            res.redirect("/");
        });

    app.route("/auth/google/callback")
        .get(
            passport.authenticate("google", {
                failureRedirect: "/login"
            }),
            (req, res) => res.redirect("/")
        );

    app.route("/api/*")
        .all((req, res, next) => {
            if(controller.isAuthenticated(req))
                return next();
            else
                return res.status(403).send("Forbidden");
        });
};

module.exports = authRoutes;
