const { ArrayCollection } = require("wetland");

const ExecCycle = require("../models/ExecCycle");
const TestRun = require("../models/TestRun");
const TestCase = require("../models/TestCase");

const _getTestRuns = (execCycleId, manager) => {
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

const _getTestCases = (idArr, manager) => {
    const repository = manager.getRepository(TestCase);
    const pArr = idArr.map(id => repository.findOne(id));
    return Promise.all(pArr);
};

const findAll = wetland => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(ExecCycle);

    return repository
        .find()
        .then(cycles => cycles || [])
        .then(cycles => Promise.all(cycles.map(c => _getTestRuns(c.id, manager)
            .then(testRuns => Object.assign({}, c, {
                testruns: undefined,
                testRuns: testRuns
            }))))
        );
};

const findById = (id, wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(ExecCycle);
    return repository
        .findOne(id, {
            populate: "testruns"
        })
        .then(execCycle => Object.assign({}, execCycle, {
            testruns: undefined,
            testRuns: execCycle.testruns
        }));
};

const create = (obj, wetland) => {
    if(!obj.name)
        return Promise.reject("name is required");
    const data = {
        name: obj.name
    };
    const manager  = wetland.getManager();
    const populator = wetland.getPopulator(manager);
    const cycle = populator.assign(ExecCycle, data);
    return manager
        .persist(cycle)
        .flush()
        .then(() => cycle);
};

const update = (id, data, wetland) => {
    if(!id)
        return Promise.reject("id is required");
    if(!data)
        return Promise.reject("No data provided");
    if(!data.testCases)
        return Promise.reject("testCases required");
    if(!data.status)
        return Promise.reject("status is required");

    const manager  = wetland.getManager();
    const repository = manager.getRepository(ExecCycle);
    const populator = wetland.getPopulator(manager);
    const uow = manager.getUnitOfWork();

    return repository.findOne(id).then(cycle => {
        if(!cycle)
            return Promise.reject(`ExecCycle with id ${id} not found`);
        try {
            return Promise.all([
                _getTestCases(data.testCases, manager),
                _getTestRuns(id, manager)
            ])
            .then(result => {
                const testCases = result[0];
                const testRuns = result[1];
                const newTestCases = testCases.filter(tc => !testRuns.find(tr => tr.testCase==tc.id));
                const removedTestRuns = testRuns.filter(tr => !testCases.find(tc => tc.id==tr.testCase));

                // remove unused testRuns
                const testRunRepo = manager.getRepository(TestRun);
                removedTestRuns.forEach(tr => manager.remove(tr));

                // create new testRuns
                const newTestRuns = newTestCases.map(tc => ({
                    name: tc.name,
                    testcase: {
                        id: tc.id
                    },
                    execCycle: {
                        id
                    }
                }));

                // retained testRuns
                const retainedTestRuns = testRuns
                    .filter(tr => testCases.find(tc => tc.id==tr.testCase))
                    .map(tr => ({
                        id: tr.id
                    }));
                return [
                    ...retainedTestRuns,
                    ...newTestRuns
                ];
            })
            .then(testRuns => {
                const arrTestRuns = new ArrayCollection();
                testRuns.forEach(tr => arrTestRuns.push(tr));
                data = Object.assign({}, data, {
                    testCases: undefined,
                    testruns: arrTestRuns
                });
                populator.assign(ExecCycle, data, cycle, true);
                // uow.registerDirty(cycle, [ "testruns" ]);
                return manager
                    .flush()
                    .then(() => cycle);
            });
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
    const repository = manager.getRepository(ExecCycle);

    return repository.findOne(id)
        .then(cycle => {
            if(!cycle)
                return Promise.reject(`ExecCycle with id ${id} not found`);
            return manager.remove(cycle)
                .flush()
                .then(() => cycle);
        });
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};
