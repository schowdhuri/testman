const testCaseRoutes = require("./TestCaseRoutes");
const defectRoutes = require("./DefectRoutes");
const commentRoutes = require("./CommentRoutes");
// more routes

module.exports = app => {
	testCaseRoutes(app);
    defectRoutes(app);
    commentRoutes(app);
	// ...
};
