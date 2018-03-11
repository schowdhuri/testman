"use strict";

const controller = require("../controllers/TestPlanController");
const sendError = require("../helpers/sendHttpError");

const testPlanRoutes = app => {
	app.route("/api/testplan")
		.get(async (req, res) => {
			try {
				const result = await controller.findAll(req.wetland)
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
		});

	app.route("/api/testplan/:id")
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

module.exports = testPlanRoutes;
