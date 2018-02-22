const TestRun = require("../models/TestRun");
const TestCase = require("../models/TestCase");
const ExecCycle = require("../models/ExecCycle");

const getTestCase = require("./TestCaseController").findById;

const dateFormat = require("../../common/utils/dateFormat");

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

const findAll = (execCycleId, wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(TestRun);
    const qb = repository.getQueryBuilder("tr");
    return qb
        .leftJoin("tr.execcycle", "ec")
        .leftJoin("tr.testcase", "tc")
        .select("tr.id", "tc.id", "tc.name", "ec.id", "tr.status")
        .where({ "ec.id": execCycleId })
        .getQuery()
        .execute()
        .then(resArr => resArr.map(res => ({
            id: res["tr.id"],
            status: res["tr.status"],
            execCycle: res["ec.id"],
            name: res["tc.name"],
            testCase: res["tc.id"]
        })));
};

const findById = (id, wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(TestRun);
    return repository
        .findOne(id, {
            populate: [ "testcase", "execcycle" ]
        })
        .then(testRun => {
            if(testRun)
                return testRun;
            return Promise.reject("Not found");
        })
        .then(testRun => Object.assign({}, testRun, {
            execcycle: undefined,
            testcase: undefined,
            execCycle: testRun.execcycle,
            testCase: testRun.testcase,
            created: dateFormat(testRun.created),
            modified: dateFormat(testRun.modified)
        }))
        .then(testRun => getTestCase(testRun.testCase.id, wetland)
            .then(testCase => Object.assign({}, testRun, {
                testCase: testCase
            }))
        );
};

const create = (data, wetland) => {
    if(!data.execCycle)
        return Promise.reject("execCycle is required");
    if(!data.testCase)
        return Promise.reject("testCase is required");
    const obj = {
        name: data.name,
        testcase: {
            id: data.testCase
        },
        execCycle: {
            id: data.execCycle
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
    if(!data.testCase)
        return Promise.reject("testCase is required");
    if(!data.status)
        return Promise.reject("status is required");

    const manager  = wetland.getManager();
    const repository = manager.getRepository(TestRun);
    const populator = wetland.getPopulator(manager);

    return repository.findOne(id, { populate: [ "testcase", "execcycle" ] })
        .then(testRun => {
            if(!testRun)
                return Promise.reject(`TestRun with id ${id} not found`);
            data.testcase = {
                id: data.testCase
            };
            const updated = populator.assign(TestRun, data, testRun, true);
            return manager
                .flush()
                .then(() => Object.assign({}, updated, {
                    execcycle: undefined,
                    testcase: undefined,
                    execCycle: updated.execcycle,
                    testCase: updated.testcase
                }));
        })
        .catch(ex => {
            console.log(ex)
            return Promise.reject(ex);
        });
};

const remove = (id, wetland) => {
    if(!id)
        return Promise.reject("id is required");

    const manager = wetland.getManager();
    const repository = manager.getRepository(TestRun);

    return repository.findOne(id)
        .then(testRun => {
            if(!testRun)
                return Promise.reject(`TestRun with id ${id} not found`);
            return manager.remove(testRun)
                .flush()
                .then(() => testRun);
        });
};

const bulkRemove = (payload, wetland) => {
    if(!payload.ids || !payload.ids.length)
        return Promise.reject("ids required");
    const ids = payload.ids;
    const manager = wetland.getManager();
    const repository = manager.getRepository(TestRun);

    const pArrDelete = ids.map(id => repository.findOne(id)
        .then(testRun => {
            if(!testRun)
                return Promise.reject(`TestRun #${id} not found`);
            manager.remove(testRun);
        }));
    return Promise.all(pArrDelete)
        .then(() => manager.flush().then(() => ids));
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
    bulkRemove
};
