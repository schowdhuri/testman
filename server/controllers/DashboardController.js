const moment = require("moment");

const Comment = require("../models/Comment");
const Defect = require("../models/Defect");
const ExecCycle = require("../models/ExecCycle");
const TestCase = require("../models/TestCase");

const TR_STATES = require("../../common/constants/TestRunStates");


const getSummary = async (wetland, user) => {
    // current execCycles
    const manager = wetland.getManager();
    const commentRepo = manager.getRepository(Comment);
    const ecRepo = manager.getRepository(ExecCycle);
    const execCycles = await ecRepo.find({ status: "In Progress"}, { limit: 10 });

    const pArrECDetails = execCycles.map(ec => ecRepo.getDetails(ec.id));
    let ecDetails = await Promise.all(pArrECDetails);

    ecDetails = ecDetails.map(execCycle => {
        const { testRuns, ...others } = execCycle;
        const pending = testRuns.filter(tr => tr.status==TR_STATES[0]).length;
        const passed = testRuns.filter(tr => tr.status==TR_STATES[1]).length;
        const failed = testRuns.filter(tr => tr.status==TR_STATES[2]).length;
        return {
            ...others,
            pending,
            passed,
            failed
        };
    });

    // get defects recently tagged
    const defectRepo = manager.getRepository(Defect);
    const defectsAssigned = await defectRepo.find({
        "a.id": user.id
    }, {
        populate: [
            { assignee: "a" },
            "user"
        ],
        limit: 10
    });

    // defects raised by this user
    const defectsRaised = await defectRepo.find({
        "u.id": user.id
    }, {
        populate: [{ user: "u" }]
    });

    const allDefectIds = defectsRaised.map(d => d.id);
    defectsAssigned.forEach(d => allDefectIds.push(d.id));

    // comments on all defects related to this user
    const pArrDefectComments = allDefectIds.map(id =>
        commentRepo.findByDefect(id));
    const arrDefectComments = await Promise.all(pArrDefectComments);

    // test cases added by this user
    const testCaseRepo = manager.getRepository(TestCase);
    const testCasesAdded = await testCaseRepo.find({
        "u.id": user.id
    }, {
        populate: [{ user: "u" }]
    });
    // comments on all testCases added by this user
    const pArrTestCaseComments = testCasesAdded.map(testCase =>
        commentRepo.findByTestCase(testCase.id));
    const arrTestCaseComments = await Promise.all(pArrTestCaseComments);

    let allComments = [];
    allDefectIds.forEach((id, index) => {
        arrDefectComments[index].forEach(comment => {
            allComments.push({
                id: comment.id,
                name: comment.content,
                created: comment.created,
                modified: comment.modified,
                user: comment.user,
                entity: "defect",
                entityId: id
            });
        });
    });
    testCasesAdded.forEach((testCase, index) => {
        arrTestCaseComments[index].forEach(comment => {
            allComments.push({
                id: comment.id,
                name: comment.content,
                created: comment.created,
                modified: comment.modified,
                user: comment.user,
                entity: "testCase",
                entityId: testCase.id,
                testPlanId: testCase.testplan.id
            });
        });
    });
    allComments = allComments
        .sort((a, b) =>
            moment(a.created, "DD MMM, YYYY HH:mm").isAfter(moment(b.created, "DD MMM, YYYY HH:mm"))
                ? -1
                : 1
        ).slice(0, 20);
    return {
        defects: defectsAssigned,
        execCycles: ecDetails,
        recentComments: allComments
    };
};

module.exports = {
    getSummary
};
