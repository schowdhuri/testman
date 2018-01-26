const testCaseRoutes = require("./TestCaseRoutes");
const defectRoutes = require("./DefectRoutes");
const commentRoutes = require("./CommentRoutes");

const pageRoutes = require("./pages");
// more routes

module.exports = app => {
	testCaseRoutes(app);
    defectRoutes(app);
    commentRoutes(app);

    pageRoutes(app);
	// ...
};
