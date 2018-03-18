const authRoutes = require("./AuthRoutes");

const attachmentRoutes = require("./AttachmentRoutes");
const commentRoutes = require("./CommentRoutes");
const defectRoutes = require("./DefectRoutes");
const execCycleRoutes = require("./ExecCycleRoutes");
const testCaseRoutes = require("./TestCaseRoutes");
const testPlanRoutes = require("./TestPlanRoutes");
const testRunRoutes = require("./TestRunRoutes");
const userRoutes = require("./UserRoutes");

const pageRoutes = require("./pages");

module.exports = app => {
    authRoutes(app);

    attachmentRoutes(app);
    testPlanRoutes(app);
	testCaseRoutes(app);
    defectRoutes(app);
    commentRoutes(app);
    testRunRoutes(app);
    execCycleRoutes(app);
    userRoutes(app);

    pageRoutes(app);
};
