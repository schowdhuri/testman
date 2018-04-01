"use strict";

const STATIC_DIR_ALIAS = require("../constants/paths").STATIC_DIR_ALIAS;

const isAuthenticated = require("../controllers/AuthController").isAuthenticated;


const pageRoutes = app => {
    app.route("/login").get((req, res) => {
        res.render("login");
    });
    app.route("/").get((req, res) => {
        if(isAuthenticated(req))
            return res.render("index");
        res.render("login");
    });
    app.route("*").get((req, res, next) => {
        if(req.url.startsWith(`${STATIC_DIR_ALIAS}/`) ||
            req.url.startsWith("/__webpack_hmr")
        ) {
            return next();
        }
        res.render("index");
    });
};

module.exports = pageRoutes;
