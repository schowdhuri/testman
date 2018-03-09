"use strict";

const controller = require("../controllers/CommentController");

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
				res.status(500).send(ex);
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
				res.status(500).send(ex);
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
				res.status(500).send(ex);
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
				res.status(500).send(ex);
			}
		});
};

module.exports = commentRoutes;
