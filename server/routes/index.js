const authRoutes = require("./AuthRoutes");

const attachmentRoutes = require("./AttachmentRoutes");
const commentRoutes = require("./CommentRoutes");
const dashboardRoutes = require("./DashboardRoutes");
const defectRoutes = require("./DefectRoutes");
const execCycleRoutes = require("./ExecCycleRoutes");
const loginCheckRoute = require("./LoginCheckRoute");
const testCaseRoutes = require("./TestCaseRoutes");
const testPlanRoutes = require("./TestPlanRoutes");
const testRunRoutes = require("./TestRunRoutes");
const userRoutes = require("./UserRoutes");

const pageRoutes = require("./pages");

module.exports = app => {
    authRoutes(app);
    loginCheckRoute(app);

    attachmentRoutes(app);
    commentRoutes(app);
    dashboardRoutes(app);
    defectRoutes(app);
    execCycleRoutes(app);
    testCaseRoutes(app);
    testPlanRoutes(app);
    testRunRoutes(app);
    userRoutes(app);

    pageRoutes(app);
};
