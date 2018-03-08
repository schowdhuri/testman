const passport = require("passport");

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
};

module.exports = authRoutes;
