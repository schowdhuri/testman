const authRoutes = require("./AuthRoutes");

const testPlanRoutes = require("./TestPlanRoutes");
const testCaseRoutes = require("./TestCaseRoutes");
const defectRoutes = require("./DefectRoutes");
const commentRoutes = require("./CommentRoutes");
const testRunRoutes = require("./TestRunRoutes");
const execCycleRoutes = require("./ExecCycleRoutes");
const userRoutes = require("./UserRoutes");

const pageRoutes = require("./pages");
// more routes

module.exports = app => {
    authRoutes(app);
    testPlanRoutes(app);
	testCaseRoutes(app);
    defectRoutes(app);
    commentRoutes(app);
    testRunRoutes(app);
    execCycleRoutes(app);
    userRoutes(app);

    pageRoutes(app);
	// ...
};
