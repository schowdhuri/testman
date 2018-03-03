const { ArrayCollection } = require("wetland");

const Defect = require("../models/Defect");
const TestRun = require("../models/TestRun");
const TestCase = require("../models/TestCase");
const ExecCycle = require("../models/ExecCycle");

const getTestCase = require("./TestCaseController").findById;

const STATES = require("../../common/constants/TestRunStates");
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
            populate: [ "testcase", "execcycle", "defects" ]
        })
        .then(testRun => {
            if(testRun)
                return testRun;
            return Promise.reject("Not found");
        })
        .then(testRun => Object.assign({}, testRun, {
            execcycle: undefined,
            execCycle: testRun.execcycle,
            testCase: testRun.testcase,
            testcase: undefined,
            created: dateFormat(testRun.created),
            modified: dateFormat(testRun.modified),
            runDate: testRun.runDate && dateFormat(testRun.runDate) || null
        }))
        .then(testRun => getTestCase(testRun.testCase.id, wetland)
            .then(testCase => Object.assign({}, testRun, {
                testCase: Object.assign({}, testCase, {
                    testPlan: testCase.testplan,
                    testplan: undefined
                })
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
    if(!STATES.find(s => s==data.status))
        return Promise.reject("Invalid status");

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
            if(data.status != testRun.status) {
                if(data.status==STATES[0])
                    testRun.runDate = null;
                else
                    testRun.runDate = new Date();
            }
            const updated = populator.assign(TestRun, data, testRun, true);
            return manager
                .flush()
                .then(() => findById(id, wetland));
        })
        .catch(ex => {
            console.log(ex)
            return Promise.reject(ex);
        });
};

const linkDefects = (id, data, wetland) => {
    if(!id)
        return Promise.reject("id is required");

    const defectIds = data.defects;
    if(!defectIds)
        return Promise.reject("defects are required");

    const manager = wetland.getManager();
    const repository = manager.getRepository(TestRun);
    const defectRepository = manager.getRepository(Defect);
    const populator = wetland.getPopulator(manager);

    return repository.findOne(id, { populate: [ "defects", "testcase" ] })
        .then(testRun => {
            if(!testRun)
                return Promise.reject(`TestRun with id ${id} not found`);
            
            const pArr = defectIds.map(defectId => defectRepository
                .findOne(defectId, { populate: [ "testcases" ] })
                .then(defect => defect)
                .catch(ex => console.log("Defect ID: ", defectId, "not found", ex)));
            
            return Promise.all(pArr)
                .then(defects => {
                    const arrDefects = new ArrayCollection();
                    testRun.defects.forEach(d => arrDefects.push({ id: d.id }));
                    defects
                        .filter(d => d)
                        .forEach(defect => {
                            if(!testRun.defects.find(d => d.id==defect.id))
                                arrDefects.push({ id: defect.id });
                            
                            const arrTestCases = new ArrayCollection();
                            if(defect.testcases)
                                defect.testcases.forEach(tc => arrTestCases.push(tc));
                            if(!defect.testcases.find(tc => tc.id==testRun.testcase.id)) {
                                arrTestCases.push({ id: testRun.testcase.id });
                                const defectData = {
                                    testcases: arrTestCases
                                };
                                populator.assign(Defect, defectData, defect, true);          
                            }
                        });
                    const data = {
                        defects: arrDefects
                    };
                    const updated = populator.assign(TestRun, data, testRun, true);
                    return manager
                        .flush()
                        .then(() => updated);
                    return updated;
                });
        })
        .catch(ex => console.log(ex));
};

const unlinkDefect = (id, defectId, wetland) => {
    if(!id)
        return Promise.reject("id is required");
    if(!defectId)
        return Promise.reject("defectId is required");

    const manager = wetland.getManager();
    const repository = manager.getRepository(TestRun);
    const defectRepository = manager.getRepository(Defect);
    const populator = wetland.getPopulator(manager);

    return repository.findOne(id, { populate: [ "defects", "testcase" ] })
        .then(testRun => {
            if(!testRun)
                return Promise.reject(`TestRun with id ${id} not found`);

            return defectRepository.findOne(defectId, { populate: [ "testcases" ] })
                .then(defect => {
                    let removeDefect = false;
                    if(defect.testcases.length==1 &&
                        defect.testcases[0].id == testRun.testcase.id
                    ) {
                        // testRun.testCase this is the only testcase
                        // for this defect
                        removeDefect = true;
                    }
                    const arrDefects = new ArrayCollection();
                    testRun.defects
                        .filter(d => d.id != defectId)
                        .forEach(d => arrDefects.push({
                            id: d.id
                        }));
                    const data = {
                        defects: arrDefects,
                        testcase: {
                            id: testRun.testcase.id
                        }
                    };
                    const updated = populator.assign(TestRun, data, testRun, true);
                    if(removeDefect)
                        manager.remove(defect);
                    return manager
                        .flush()
                        .then(() => updated);
                });
        })
        .catch(ex => console.log(ex));
};

const remove = (id, wetland) => {
    if(!id)
        return Promise.reject("id is required");

    const manager = wetland.getManager();
    const repository = manager.getRepository(TestRun);

    return findById(id, wetland)
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
    bulkRemove,
    linkDefects,
    unlinkDefect
};
