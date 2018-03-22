"use strict";

const controller = require("../controllers/UserController");

const userRoutes = app => {
    app.route("/api/user")
        .get((req, res) => {
            controller.findAll(req.wetland)
                .then(result => {
                    res.json(result);
                })
                .catch(ex => {
                    res.status(500).send(ex);
                });
        });

    app.route("/api/user/:id")
        .get((req, res) => {
            controller.findById(req.params.id, req.wetland)
                .then(result => {
                    res.json(result);
                })
                .catch(ex => {
                    res.status(500).send(ex);
                });
        });
};

module.exports = userRoutes;
