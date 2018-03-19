"use strict";

const pageRoutes = app => {
    app.route("/login").get((req, res) => {
        res.render("login");
    });
    app.route("*").get((req, res) => {
        res.render("index");
    });
};

module.exports = pageRoutes;
