const { ArrayCollection, UnitOfWork } = require("wetland");

const Defect = require("../models/Defect");
const TestRun = require("../models/TestRun");
const TestCase = require("../models/TestCase");
const ExecCycle = require("../models/ExecCycle");

const getDefect = require("./DefectController").findById;
const getTestCase = require("./TestCaseController").findById;

const STATES = require("../../common/constants/TestRunStates");
const dateFormat = require("../../common/utils/dateFormat");


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
        throw new Error("Not found");
    testRun = {
        ...testRun,
        execCycle: testRun.execcycle,
        testCase: testRun.testcase,
        created: dateFormat(testRun.created),
        modified: dateFormat(testRun.modified),
        runDate: testRun.runDate && dateFormat(testRun.runDate) || null
    };
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

const create = async (data, wetland) => {
    if(!data.execCycle)
        throw new Error("execCycle is required");
    if(!data.testCase)
        throw new Error("testCase is required");
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
    await manager
        .persist(testRun)
        .flush();
    return testRun;
};

const update = async (id, data, wetland) => {
    if(!id)
        throw new Error("id is required");
    if(!data)
        throw new Error("No data provided");
    if(!data.testCase)
        throw new Error("testCase is required");
    if(!data.status)
        throw new Error("status is required");
    if(!STATES.find(s => s==data.status))
        throw new Error("Invalid status");

    delete data.defects;

    const manager  = wetland.getManager();
    const repository = manager.getRepository(TestRun);
    const populator = wetland.getPopulator(manager);

    const testRun = await repository.findOne(id, { populate: [ "testcase", "execcycle" ] });
    try {
        if(!testRun)
            throw new Error(`TestRun with id ${id} not found`);
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
        await manager.flush();
        return findById(id, wetland);
    } catch(ex) {
        console.log(ex)
        throw new Error(ex);
    }
};

const linkDefects = async (id, data, wetland) => {
    if(!id)
        throw new Error("id is required");

    const defectIds = data.defects;
    if(!defectIds)
        throw new Error("defects are required");

    const manager = wetland.getManager();
    const repository = manager.getRepository(TestRun);
    const defectRepository = manager.getRepository(Defect);
    const populator = wetland.getPopulator(manager);

    const testRun = await repository.findOne(id, { populate: [ "defects", "testcase" ] });
    if(!testRun)
        throw new Error(`TestRun with id ${id} not found`);
        
    const defects = [];
    for(let i=0; i<defectIds.length; i++) {
        try {
            const defect = await defectRepository
                .findOne(defectIds[i], { populate: [ "testcases" ] });
            defects.push(defect);
        } catch(ex) {
            console.log("Defect ID: ", defectIds[i], "not found", ex);
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
        throw new Error("id is required");
    if(!defectId)
        throw new Error("defectId is required");

    const manager = wetland.getManager();
    const populator = wetland.getPopulator(manager);
    
    const defect = await getDefect(defectId, wetland);
    const testRun = await findById(id, wetland);
    
    if(!testRun)
        throw new Error(`TestRun with id ${id} not found`);
    
    try {
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
        // const updated = findById(testr)
        return testRun;
    } catch(ex) {
        console.log(ex)
        throw new Error(ex);
    }
};

const remove = async (id, wetland) => {
    if(!id)
        throw new Error("id is required");

    const manager = wetland.getManager();
    const repository = manager.getRepository(TestRun);

    const testRun = await findById(id, wetland);
    if(!testRun)
        throw new Error(`TestRun with id ${id} not found`);
    await manager.flush();
    return testRun;
};

const bulkRemove = async (payload, wetland) => {
    if(!payload.ids || !payload.ids.length)
        throw new Error("ids required");
    const ids = payload.ids;
    const manager = wetland.getManager();
    const repository = manager.getRepository(TestRun);

    ids.forEach(async id => {
        const testRun = await repository.findOne(id);
        if(!testRun)
            throw new Error(`TestRun #${id} not found`);
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
