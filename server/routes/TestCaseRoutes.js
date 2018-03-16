"use strict";

const controller = require("../controllers/TestCaseController");
const sendError = require("../helpers/sendHttpError");

const createUploader = require("../helpers/multer");

const testCaseRoutes = app => {
	app.route("/api/testcase")
		.get(async (req, res) => {
			const testPlanId = req.query.testplan;
			if(!testPlanId) {
				res.status(400).send("testplan is required");
			}
			try {
				const result = await controller.findAll(
					testPlanId,
					req.wetland
				);
				res.json(result);
			} catch(ex) {
				sendError(ex, res);
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
				sendError(ex, res);
			}
		});

	app.route("/api/testcase/upload")
		.post(createUploader(true).single("file"), async (req, res) => {
			const testPlanId = req.query.testplan;
			if(!testPlanId) {
				res.status(400).send("testplan is required");
			}
			if(!req.file)
        		res.status(400).send("No file uploaded");
			try {
				const result = await controller.bulkCreate(
					testPlanId,
					req.file,
					req.wetland,
					req.user
				);
				res.json(result);
			} catch(ex) {
				sendError(ex, res);
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
				sendError(ex, res);
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

module.exports = testCaseRoutes;
