"use strict";

const controller = require("../controllers/ExecCycleController");

const execCycleRoutes = app => {
	app.route("/api/exec")
		.get((req, res) => {
			controller.findAll(req.wetland)
				.then(result => {
					res.json(result);
				})
				.catch(ex => {
					res.status(500).send(ex);
				});
		})
		.post((req, res) => {
			controller.create(req.body, req.wetland)
				.then(result => {
					res.json(result);
				})
				.catch(ex => {
					console.log(ex)
					res.status(500).send(ex);
				});
		});

	app.route("/api/exec/:id")
		.get((req, res) => {
			controller.findById(req.params.id, req.wetland)
				.then(result => {
					res.json(result);
				})
				.catch(ex => {
					res.status(500).send(ex);
				});
		})
		.put((req, res) => {
			controller.update(req.params.id, req.body, req.wetland)
				.then(result => {
					res.json(result);
				})
				.catch(ex => {
					res.status(500).send(ex);
				});
		})
		.delete((req, res) => {
			controller.remove(req.params.id, req.wetland)
			.then(result => {
				res.json(result);
			})
			.catch(ex => {
				res.status(500).send(ex);
			});
		});
};

module.exports = execCycleRoutes;
