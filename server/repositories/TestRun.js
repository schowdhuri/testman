const fs = require("fs");
const path = require("path");
const { EntityRepository } = require("wetland");

const TestCase = require("../models/TestCase");

const dateFormat = require("../../common/utils/dateFormat");


class TestRunRepository extends EntityRepository {
    async getDetails(id) {
        let testRun = await super.findOne(id, {
            populate: [
                "testcase",
                "testcase.description",
                "testcase.testplan",
                "execcycle",
                "defects"
            ]
        });
        if(!testRun)
            return null;
        testRun = {
            ...testRun,
            execCycle: testRun.execcycle,
            created: dateFormat(testRun.created),
            modified: dateFormat(testRun.modified),
            runDate: testRun.runDate && dateFormat(testRun.runDate) || null
        };
        if(!testRun.testcase)
            throw new Error(`TestRun ${testRun.id} has no testcaseas`);

        const { execcycle, testcase, testplan, ...others } = testRun;
        testRun = {
            ...others,
            testCase: {
                id: testcase.id,
                name: testcase.name,
                description: testcase.description && testcase.description.value || "",
                testPlan: {
                    id: testcase.testplan.id
                }
            }
        };
        return testRun;
    }

    async getByTestCase(testCaseId) {
        const testRuns = await this.find({
            "testcase.id": testCaseId
        }, {
            populate: "testcase"
        });
        if(!testRuns)
            return [];
        return testRuns;
    }
}

module.exports = TestRunRepository;
