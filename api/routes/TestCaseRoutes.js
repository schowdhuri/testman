"use strict";

const controller = require("../controllers/TestCaseController");

const testCaseRoutes = app => {
	app.route("/api/testcase")
		.get((req, res) => {
			controller.findAll()
				.then(result => {
					res.json(result);
				})
				.catch(ex => {
					res.send(ex);
				});
		})
		.post((req, res) => {
			controller.create(req.body)
				.then(result => {
					res.json(result);
				})
				.catch(ex => {
					res.send(ex);
				});
		});

	app.route("/api/testcase/:id")
		.get((req, res) => {
			controller.findById(req.params.id)
				.then(result => {
					res.json(result);
				})
				.catch(ex => {
					res.send(ex);
				});
		})
		.put((req, res) => {
			controller.update(req.params.id, req.body)
				.then(result => {
					res.json(result);
				})
				.catch(ex => {
					res.send(ex);
				});
		})
		.delete((req, res) => {
			try {
				controller.remove(req.params.id)
				.then(result => {
					res.json(result);
				})
			} catch(ex) {
				res.send(ex);
			}
		});
};

module.exports = testCaseRoutes;
