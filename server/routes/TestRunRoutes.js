"use strict";

const controller = require("../controllers/TestRunController");
const sendError = require("../helpers/sendHttpError");

const testRunRoutes = app => {
	app.route("/api/testrun")
		.get(async (req, res) => {
			const execCycleId = req.query.execCycle;
			if(!execCycleId) {
				res.status(400).send("execCycle is required");
			}
			try {
				const result = await controller.findAll(
					execCycleId,
					req.wetland
				);
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

	app.route("/api/testrun/:id")
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

	app.route("/api/testrun/:id/defect")
		.post(async (req, res) => {
			try {
				const result = await controller.linkDefects(
					req.params.id,
					req.body,
					req.wetland
				);
				res.json(result);
			} catch(ex) {
				sendError(ex, res);
			}
		});

	app.route("/api/testrun/:id/defect/:defectId")
		.delete(async (req, res) => {
			try {
				const result = await controller.unlinkDefect(
					req.params.id,
					req.params.defectId,
					req.wetland
				);
				res.json(result);
			} catch(ex) {
				sendError(ex, res);
			}
		});
};

module.exports = testRunRoutes;
