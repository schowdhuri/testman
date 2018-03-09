"use strict";

const controller = require("../controllers/TestCaseController");

const testCaseRoutes = app => {
	app.route("/api/testcase")
		.get(async (req, res) => {
			console.log("session: ", req.session)
			const testPlanId = req.query.testplan;
			if(!testPlanId) {
				res.status(400).send("testplan is required");
			}
			console.log("User: ", req.user);
			try {
				const result = await controller.findAll(
					testPlanId,
					req.wetland
				);
				res.json(result);
			} catch(ex) {
				res.status(500).send(ex);
			}
		})
		.post(async (req, res) => {
			const testPlanId = req.query.testplan;
			if(!testPlanId) {
				res.status(400).send("testplan is required");
			}
			try {
				const result = await controller.create(
					testPlanId,
					req.body,
					req.wetland,
					req.user
				);
				res.json(result);
			} catch(ex) {
				res.status(500).send(ex);
			}
		});

	app.route("/api/testcase/:id")
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
				console.log("session: ", req.session)
				const result = await controller.update(
					req.params.id,
					req.body,
					req.wetland,
					req.user
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
				console.log(ex)
				res.status(500).send(ex);
			}
		});
};

module.exports = testCaseRoutes;
