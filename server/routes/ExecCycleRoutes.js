"use strict";

const controller = require("../controllers/ExecCycleController");
const sendError = require("../helpers/sendHttpError");

const execCycleRoutes = app => {
	app.route("/api/exec")
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
		});

	app.route("/api/exec/:id")
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

	app.route("/api/exec/:id/start")
		.post(async (req, res) => {
			try {
				const result = await controller.startExec(
					req.params.id,
					req.wetland,
					req.user
				);
				res.json(result);
			} catch(ex) {
				sendError(ex, res);
			}
		});

	app.route("/api/exec/:id/end")
		.post(async (req, res) => {
			try {
				const result = await controller.endExec(
					req.params.id,
					req.wetland,
					req.user
				);
				res.json(result);
			} catch(ex) {
				sendError(ex, res);
			}
		});
};

module.exports = execCycleRoutes;
