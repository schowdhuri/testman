const testPlanRoutes = require("./TestPlanRoutes");
const testCaseRoutes = require("./TestCaseRoutes");
const defectRoutes = require("./DefectRoutes");
const commentRoutes = require("./CommentRoutes");
const testRunRoutes = require("./TestRunRoutes");

const pageRoutes = require("./pages");
// more routes

module.exports = app => {
    testPlanRoutes(app);
	testCaseRoutes(app);
    defectRoutes(app);
    commentRoutes(app);
    testRunRoutes(app);

    pageRoutes(app);
	// ...
};
