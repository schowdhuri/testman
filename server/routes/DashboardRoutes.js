"use strict";

const controller = require("../controllers/DashboardController");
const sendError = require("../helpers/sendHttpError");


const dashboardRoutes = app => {
    app.route("/api/dashboard")
        .get(async (req, res) => {
            try {
                const result = await controller.getSummary(
                    req.wetland,
                    req.user
                );
                res.json(result);
            } catch(ex) {
                sendError(ex, res);
            }
        });
};

module.exports = dashboardRoutes;
