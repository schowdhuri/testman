"use strict";

const HttpError = require("../helpers/HttpError");
const sendError = require("../helpers/sendHttpError");

const loginCheckRoute = app => {
    app.route("/api/login")
        .get((req, res) => {
            if(req.user) {
                res.json(true);
            } else {
                sendError(new HttpError(401, "Not authorized"), res);
            }
        });
};

module.exports = loginCheckRoute;
