"use strict";

const controller = require("../controllers/CommentController");
const sendError = require("../helpers/sendHttpError");

const commentRoutes = app => {
	app.route("/api/comment")
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

	app.route("/api/comment/:id")
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
			console.log(req.session)
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
};

module.exports = commentRoutes;
