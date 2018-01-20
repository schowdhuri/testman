const express = require("express");
const bodyParser = require("body-parser");

// const db = require("./api/services/dbconnect");
const routes = require("./api/routes");

const PORT = 3000;

// Setup DB
// const dbConn = db.connect();

// Load models
// const { TestCase } = modelFactory(dbConn);

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
routes(app);

// Start!
app.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`);
});
