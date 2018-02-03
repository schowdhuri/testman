const TestRun = require("../models/TestRun");
const TestCase = require("../models/TestCase");
const ExecCycle = require("../models/ExecCycle");

const _getTestCases = (testRunId, manager) => {
    const repository = manager.getRepository(TestCase);
    const qb = repository.getQueryBuilder("tr");
    return qb
        .leftJoin("tr.testcase", "tc")
        .select("tc.name", "tc.id")
        .where({ "tr.id": testRunId })
        .getQuery()
        .execute()
        .then(resArr => resArr.map(res => ({
            id: res["tr.id"],
            name: res["tr.name"],
            status: res["tc.status"]
        })));
};

const findAll = wetland => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(TestRun);

    return repository
        .find({}, {
            populate: [ "testcase", "execcycle" ]
        })
        .then(testRuns => testRuns || [])
        // .then(testRuns => Promise.all(testPlans.map(tp => _getTestCases(tp.id, manager)
        //     .then(testCases => Object.assign({}, tp, {
        //         testcases: undefined,
        //         testCases: testCases.map(tc => tc && tc.id)
        //     }))
        // ))).catch(ex => console.log(ex));
};

const findById = (id, wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(TestPlan);
    return repository
        .findOne(id)
        .then(testPlan => _getTestCases(testPlan.id, manager)
            .then(testCases => Object.assign({}, testPlan, {
                testcases: undefined,
                testCases: testCases.map(tc => tc && tc.id)
            })));
};

const create = (obj, wetland) => {
    if(!obj.name)
        return Promise.reject("name is required");
    if(!obj.testCase)
        return Promise.reject("testCase is required");
    const data = {
        name: obj.name,
        testcase: {
            id: obj.testCase
        }
    };
    const manager  = wetland.getManager();
    const populator = wetland.getPopulator(manager);
    const testRun = populator.assign(TestRun, data);
    return manager
        .persist(testRun)
        .flush()
        .then(() => testRun);
};

const update = (id, data, wetland) => {
    if(!id)
        return Promise.reject("id is required");
    if(!data)
        return Promise.reject("No data provided");
    if(!data.name)
        return Promise.reject("name is required");

    const manager  = wetland.getManager();
    const repository = manager.getRepository(TestPlan);

    return repository.findOne(id).then(testPlan => {
        if(!testPlan)
            return Promise.reject(`TestPlan with id ${id} not found`);
        try {
            testPlan.name = data.name;
            return manager
                .flush()
                .then(() => testPlan);
        } catch(ex) {
            console.log(ex);
            return Promise.reject(ex);
        }
    });
};

const remove = (id, wetland) => {
    if(!id)
        return Promise.reject("id is required");

    const manager = wetland.getManager();
    const repository = manager.getRepository(TestPlan);

    return repository.findOne(id)
        .then(testPlan => {
            if(!testPlan)
                return Promise.reject(`TestPlan with id ${id} not found`);
            return manager.remove(testPlan)
                .flush()
                .then(() => testPlan);
        });
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};
