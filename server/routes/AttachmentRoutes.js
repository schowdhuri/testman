"use strict";

const controller = require("../controllers/AttachmentController");
const sendError = require("../helpers/sendHttpError");

const createUploader = require("../helpers/multer");

const attachmentRoutes = app => {
	app.route("/api/attachment")
		.post(createUploader().single("file"), async (req, res) => {
			if(!req.file)
        		res.status(400).send("No file uploaded");
			try {
				const result = await controller.create(
					req.file,
					req.wetland,
					req.user
				);
				res.json(result);
			} catch(ex) {
				sendError(ex, res);
			}
		});

	app.route("/api/attachment/:id")
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
					req.wetland,
					req.user
				);
				res.json(result);
			} catch(ex) {
				sendError(ex, res);
			}
		});

	app.route("/api/attachment/:id/download")
		.get(async (req, res) => {
			try {
				const result = await controller.download(
					req.params.id,
					req.wetland
				);
				res.download(result.path, result.name);
			} catch(ex) {
				sendError(ex, res);
			}
		})
};

module.exports = attachmentRoutes;
