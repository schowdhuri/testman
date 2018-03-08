"use strict";

const controller = require("../controllers/TestRunController");

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
				res.status(500).send(ex);
			}
		})
		.post(async (req, res) => {
			try {
				const result = await controller.create(
					req.body,
					req.wetland
				);
				res.json(result);
			} catch(ex) {
				res.status(500).send(ex);
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
				res.status(500).send(ex);
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
				console.log(ex)
				res.status(500).send(ex);
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
				res.status(500).send(ex);
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
				res.status(500).send(ex);
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
				res.status(500).send(ex);
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
				console.log("ERR: ", ex)
				res.status(500).send(ex);
			}
		});
};

module.exports = testRunRoutes;
