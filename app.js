const express = require("express");
const bodyParser = require("body-parser");
const expressWetland = require("express-wetland");
const Wetland = require("wetland").Wetland;
const wetlandConfig = require("./wetland");

const routes = require("./api/routes");

const PORT = 3200;

// Setup DB
// const dbConn = db.connect();

// Load models
// const { TestCase } = modelFactory(dbConn);

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressWetland(new Wetland(wetlandConfig)));

// Routes
routes(app);

// Start!
app.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`);
});
