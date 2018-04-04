const { ArrayCollection } = require("wetland");

const Defect = require("../models/Defect");
const TestRun = require("../models/TestRun");

const getDefect = require("./DefectController").findById;
const getTestCase = require("./TestCaseController").findById;

const STATES = require("../../common/constants/TestRunStates");
const dateFormat = require("../../common/utils/dateFormat");
const HttpError = require("../helpers/HttpError");


const findAll = async (execCycleId, wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(TestRun);
    const qb = repository.getQueryBuilder("tr");
    const testRuns = await qb
        .leftJoin("tr.execcycle", "ec")
        .leftJoin("tr.testcase", "tc")
        .leftJoin("tr.defects", "def")
        .select("tr.id", "tc.id", "tc.name", "ec.id", "tr.status", "def.id")
        .where({ "ec.id": execCycleId })
        .getQuery()
        .getResult();

    if(!testRuns)
        return [];

    return testRuns.map(tr => {
        const testRun = {
            ...tr,
            testCase: tr.testcase.id,
            execCycle: tr.execcycle,
            name: tr.testcase.name
        };
        delete testRun.execcycle;
        delete testRun.testcase;
        return testRun;
    });
};

const findById = async (id, wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(TestRun);
    let testRun = await repository.findOne(id, {
        populate: [ "testcase", "testcase.testplan", "execcycle", "defects" ]
    });
    if(!testRun)
        throw new HttpError(404, "Not found");
    testRun = {
        ...testRun,
        execCycle: testRun.execcycle,
        testCase: testRun.testcase,
        created: dateFormat(testRun.created),
        modified: dateFormat(testRun.modified),
        runDate: testRun.runDate && dateFormat(testRun.runDate) || null
    };

    if(!testRun.testCase)
        throw new HttpError(500, "Invalid testRun");

    const testCase = await getTestCase(testRun.testCase.id, wetland);
    testRun = {
        ...testRun,
        testCase: {
            ...testRun.testCase,
            testPlan: testCase.testplan
        }
    };
    delete testRun.execcycle;
    delete testRun.testcase;
    delete testRun.testCase.testplan;

    return testRun;
};

const create = async (data, wetland, user) => {
    if(!data.execCycle)
        throw new HttpError(400, "execCycle is required");
    if(!data.testCase)
        throw new HttpError(400, "testCase is required");
    const obj = {
        name: data.name,
        testcase: {
            id: data.testCase
        },
        execCycle: {
            id: data.execCycle
        },
        user: {
            id: user.id
        }
    };
    const manager  = wetland.getManager();
    const populator = wetland.getPopulator(manager);
    const testRun = populator.assign(TestRun, obj);
    await manager
        .persist(testRun)
        .flush();
    return testRun;
};

const update = async (id, data, wetland, user) => {
    if(!id)
        throw new HttpError(400, "id is required");
    if(!data)
        throw new HttpError(400, "No data provided");
    if(!data.testCase)
        throw new HttpError(400, "testCase is required");
    if(!data.status)
        throw new HttpError(400, "status is required");
    if(!STATES.find(s => s==data.status))
        throw new HttpError(400, "Invalid status");

    const manager  = wetland.getManager();
    const repository = manager.getRepository(TestRun);
    const populator = wetland.getPopulator(manager);

    const testRun = await repository.findOne(id, { populate: [ "testcase", "execcycle" ] });

    if(!testRun)
        throw new HttpError(404, `TestRun with id ${id} not found`);

    const obj = {
        status: data.status,
        testcase: {
            id: data.testCase
        },
        user: {
            id: user.id
        }
    };
    if(data.status != testRun.status) {
        // status being changed
        if(data.status==STATES[0])
            obj.runDate = null;
        else
            obj.runDate = new Date();
    }
    populator.assign(TestRun, obj, testRun, true);
    await manager.flush();

    return findById(id, wetland);
};

const linkDefects = async (id, data, wetland) => {
    if(!id)
        throw new HttpError(400, "id is required");

    const defectIds = data.defects;
    if(!defectIds)
        throw new HttpError(400, "defects are required");

    const manager = wetland.getManager();
    const repository = manager.getRepository(TestRun);
    const defectRepository = manager.getRepository(Defect);
    const populator = wetland.getPopulator(manager);

    const testRun = await repository.findOne(id, { populate: [ "defects", "testcase" ] });
    if(!testRun)
        throw new HttpError(404, `TestRun with id ${id} not found`);

    const defects = [];
    for(let i=0; i<defectIds.length; i++) {
        try {
            const defect = await defectRepository
                .findOne(defectIds[i], { populate: [ "testcases" ] });
            defects.push(defect);
        } catch(ex) {
            console.log("Defect ID: ", defectIds[i], "not found", ex); // eslint-disable-line no-console
        }
    }

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
    const newData = {
        defects: arrDefects
    };
    const updated = populator.assign(TestRun, newData, testRun, true);
    await manager.flush();
    return updated;
};

const unlinkDefect = async (id, defectId, wetland) => {
    if(!id)
        throw new HttpError(400, "id is required");
    if(!defectId)
        throw new HttpError(400, "defectId is required");

    const manager = wetland.getManager();
    const populator = wetland.getPopulator(manager);

    const defect = await getDefect(defectId, wetland);
    const testRun = await findById(id, wetland);

    if(!testRun)
        throw new HttpError(404, `TestRun with id ${id} not found`);

    let shouldRemoveDefect = false;
    if(defect.testCases.length==1 &&
        defect.testCases[0].id == testRun.testCase.id
    ) {
        // testRun.testCase this is the only testcase
        // for this defect
        shouldRemoveDefect = true;
    }

    if(shouldRemoveDefect) {
        // testRun.defects = testRun.defects.filter(d => d.id!=defectId);
        const defectRepository = manager.getRepository(Defect);
        const defectEntity = await defectRepository.findOne(defectId);
        manager.remove(defectEntity);
    } else {
        // remove defect from testrun
        const arrDefects = new ArrayCollection();
        testRun.defects
            .filter(d => d.id != defectId)
            .forEach(d => arrDefects.push({
                id: d.id
            }));
        const data = {
            defects: arrDefects
        };

        const defectRepository = manager.getRepository(Defect);
        const defectEntity = await defectRepository.findOne(defectId, {
            populate: [ "testcases", "testruns" ]
        })
        const defectData = {};
        const arrTestRuns = new ArrayCollection();
        // remove testrun from defect
        defect.testRuns
            .filter(tr => tr.id != testRun.id)
            .forEach(tr => arrTestRuns.push(tr));
        defectData.testruns = arrTestRuns;

        // does testrun.testcase exist in some other testrun
        const dontRemoveTestCase = defect.testRuns.find(tr =>
            tr.id != testRun.id && tr.testCase.id==testRun.testCase.id);
        if(!dontRemoveTestCase) {
            const arrTestCases = new ArrayCollection();
            defect.testCases
                .filter(tc => tc.id != testRun.testCase.id)
                .forEach(tc => arrTestCases.push({
                    id: tc.id
                }));
            defectData.testcases = arrTestCases;
        }
        populator.assign(Defect, defectData, defectEntity, true);
        populator.assign(TestRun, data, testRun, true);
    }

    await manager.flush();
    return testRun;
};

const remove = async (id, wetland) => {
    if(!id)
        throw new HttpError(400, "id is required");

    const manager = wetland.getManager();

    const testRun = await findById(id, wetland);
    if(!testRun)
        throw new HttpError(404, `TestRun with id ${id} not found`);
    await manager.flush();
    return testRun;
};

const bulkRemove = async (payload, wetland) => {
    if(!payload.ids || !payload.ids.length)
        throw new HttpError(400, "ids required");
    const ids = payload.ids;
    const manager = wetland.getManager();
    const repository = manager.getRepository(TestRun);

    const pArr = ids.map(id => repository.findOne(id));
    const testRuns = await Promise.all(pArr);
    testRuns.forEach(testRun => {
        if(!testRun)
            throw new HttpError(404, `TestRun #${id} not found`);
        manager.remove(testRun);
    });
    await manager.flush();
    return ids;
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
