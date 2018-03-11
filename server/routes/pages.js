"use strict";

const pageRoutes = app => {
    app.route("/").get((req, res) => {
        res.render("index");
    });
    app.route("/login").get((req, res) => {
        res.render("login");
    });
};

module.exports = pageRoutes;
