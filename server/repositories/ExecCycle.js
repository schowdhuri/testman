const { EntityRepository } = require("wetland");

const TestRun = require("../models/TestRun");

const dateFormat = require("../../common/utils/dateFormat");


class ExecCycleRepository extends EntityRepository {
    async getTestRuns(id, status) {
        const manager = this.getEntityManager();
        const testRunRepo = manager.getRepository(TestRun);
        const qb = testRunRepo.getQueryBuilder("tr");

        let query = qb
            .leftJoin("tr.execcycle", "ec")
            .leftJoin("tr.testcase", "tc")
            .leftJoin("tr.defects", "def")
            .select("tr.id", "tc.id", "tc.name", "ec.id", "tr.status", "def.id")
            .where({ "ec.id": id });
        if(status)
            query = query.where(({ "tr.status": status }));

        const testRuns = await query.getQuery().getResult();

        if(!testRuns)
            return [];
        return testRuns.map(testRun => ({
            id: testRun.id,
            name: testRun.testcase.name,
            status: testRun.status,
            execCycle: testRun.execcycle.id,
            testCase: testRun.testcase.id,
            defects: testRun.defects.map(def => def.id)
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

        // return execCycles;
        // const pArr = execCycles.map(execCycle => this.getTestRuns(execCycle.id));
        // const testRuns = await Promise.all(pArr);

        return execCycles.map((execCycle, index) => {
            const { testruns, ...others } = execCycle; // eslint-disable-line no-unused-vars
            return { ...others };
        });
    }
}

module.exports = ExecCycleRepository;
