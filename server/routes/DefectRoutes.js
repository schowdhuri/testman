"use strict";

const controller = require("../controllers/DefectController");
const sendError = require("../helpers/sendHttpError");


const defectRoutes = app => {
    app.route("/api/defect")
        .get(async (req, res) => {
            try {
                const result = await controller.findAll(req.wetland);
                res.json(result);
            } catch(ex) {
                sendError(ex, res);
            }
        })
        .post(async (req, res) => {
            try {
                const result = await controller.create(
                    req.body,
                    req.wetland,
                    req.user
                );
                res.json(result);
            } catch(ex) {
                sendError(ex, res);
            }
        })
        .delete(async (req, res) => {
            try {
                const result = await controller.bulkRemove(
                    req.body,
                    req.wetland
                );
                res.json(result);
            } catch(ex) {
                sendError(ex, res);
            }
        });

    app.route("/api/defect/:id")
        .get(async (req, res) => {
            try {
                const result = await controller.findById(
                    req.params.id,
                    req.wetland
                );
                res.json(result);
            } catch(ex) {
                sendError(ex, res);
            }
        })
        .put(async (req, res) => {
            try {
                const result = await controller.update(
                    req.params.id,
                    req.body,
                    req.wetland
                );
                res.json(result);
            } catch(ex) {
                sendError(ex, res);
            }
        })
        .delete(async (req, res) => {
            try {
                const result = await controller.remove(
                    req.params.id,
                    req.wetland
                );
                res.json(result);
            } catch(ex) {
                sendError(ex, res);
            }
        });
};

module.exports = defectRoutes;
