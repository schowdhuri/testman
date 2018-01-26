const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const expressWetland = require("express-wetland");
const { Wetland }  = require("wetland");

const wetlandConfig = require("./wetland");

const routes = require("./api/routes");

const PORT = 3200;

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressWetland(new Wetland(wetlandConfig)));
app.use("/static", express.static(path.join(__dirname, "client", "dist")));

// view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Routes
routes(app);

// Start!
app.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`);
});
