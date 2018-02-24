"use strict";

const controller = require("../controllers/DefectController");

const defectRoutes = app => {
	app.route("/api/defect")
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
		})
		.delete((req, res) => {
			controller.bulkRemove(req.body, req.wetland)
			.then(result => {
				res.json(result);
			})
			.catch(ex => {
				res.status(500).send(ex);
			});
		});;

	app.route("/api/defect/:id")
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
			try {
				controller.remove(req.params.id, req.wetland)
				.then(result => {
					res.json(result);
				})
			} catch(ex) {
				res.status(500).send(ex);
			}
		});
};

module.exports = defectRoutes;
