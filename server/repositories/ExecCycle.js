const { EntityRepository } = require("wetland");

const TestRun = require("../models/TestRun");

const dateFormat = require("../../common/utils/dateFormat");


class ExecCycleRepository extends EntityRepository {
    async getTestRuns(id) {
        const manager = this.getEntityManager();
        const testRunRepo = manager.getRepository(TestRun);
        const qb = testRunRepo.getQueryBuilder("tr");

        const testRuns = await qb
            .leftJoin("tr.execcycle", "ec")
            .leftJoin("tr.testcase", "tc")
            .select("tr.id", "tc.id", "tc.name", "ec.id", "tr.status")
            .where({ "ec.id": id })
            .getQuery()
            .execute();

        if(!testRuns)
            return [];

        return testRuns.map(testRun => ({
            id: testRun["tr.id"],
            status: testRun["tr.status"],
            execCycle: testRun["ec.id"],
            name: testRun["tc.name"],
            testCase: testRun["tc.id"]
        }));
    }

    async getDetails(id) {
        const execCycle = await super.findOne(id);

        if(!execCycle)
            return null;

        const testRuns = await this.getTestRuns(id);
        const { testruns, ...others } = execCycle; // eslint-disable-line no-unused-vars

        return {
            ...others,
            testRuns,
            created: dateFormat(execCycle.created),
            modified: dateFormat(execCycle.modified)
        };
    }

    async findAll() {
        let execCycles = await this.find();
        if(!execCycles)
            return [];

        const pArr = execCycles.map(execCycle => this.getTestRuns(execCycle.id));
        const testRuns = await Promise.all(pArr);

        return execCycles.map((execCycle, index) => {
            const { testruns, ...others } = execCycle; // eslint-disable-line no-unused-vars
            return {
                ...others,
                testRuns: testRuns[index]
            };
        });
    }
}

module.exports = ExecCycleRepository;
