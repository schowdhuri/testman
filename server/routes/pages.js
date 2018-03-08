"use strict";

const pageRoutes = app => {
    app.route("/").get((req, res) => {
        res.render("index", { title: 'Hey', message: 'Hello there!' });
    });
};

module.exports = pageRoutes;
