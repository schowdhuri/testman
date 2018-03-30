const { ArrayCollection } = require("wetland");

const ExecCycle = require("../models/ExecCycle");
const TestCase = require("../models/TestCase");

const HttpError = require("../helpers/HttpError");

const CLONE_TYPES = require("../../common/constants/ExecCycleCloneTypes");


const _getTestCases = async (idArr, manager) => {
    const repository = manager.getRepository(TestCase);
    const pArr = idArr.map(id => repository.findOne(id));
    const testCases = await Promise.all(pArr);
    if(!testCases)
        return [];
    return testCases;
};

const findAll = async (wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(ExecCycle);

    let execCycles = await repository.findAll();

    return execCycles;
};

const findById = async (id, wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(ExecCycle);

    const execCycle = await repository.getDetails(id);

    if(!execCycle)
        throw new HttpError(404, "Not found");

    return execCycle;
};

const create = async (obj, wetland) => {
    if(!obj.name)
        throw new HttpError(400, "name is required");
    const data = {
        name: obj.name
    };
    const manager  = wetland.getManager();
    const populator = wetland.getPopulator(manager);
    const cycle = populator.assign(ExecCycle, data);
    await manager.persist(cycle).flush();
    return cycle;
};

const update = async (id, data, wetland) => {
    if(!id)
        throw new HttpError(400, "id is required");
    if(!data)
        throw new HttpError(400, "No data provided");
    if(!data.testCases)
        throw new HttpError(400, "testCases required");
    if(!data.status)
        throw new HttpError("status is required");

    const manager  = wetland.getManager();
    const repository = manager.getRepository(ExecCycle);
    const populator = wetland.getPopulator(manager);

    const execCycle = await repository.findOne(id)
    if(!execCycle)
        throw new HttpError(404, `ExecCycle with id ${id} not found`);
    const testCases = await _getTestCases(data.testCases, manager);
    const testRuns = await repository.getTestRuns(id);

    const newTestCases = testCases
        .filter(tc => !testRuns.find(tr => tr.testCase==tc.id));
    const removedTestRuns = testRuns
        .filter(tr => !testCases.find(tc => tc.id==tr.testCase));

    // remove unused testRuns
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
    const allTestRuns = [
        ...retainedTestRuns,
        ...newTestRuns
    ];
    const arrTestRuns = new ArrayCollection();
    allTestRuns.forEach(tr => arrTestRuns.push(tr));
    data = {
        ...data,
        testruns: arrTestRuns
    };
    delete data.testRuns;

    const updated = populator.assign(ExecCycle, data, execCycle, true);
    await manager.flush();

    return findById(updated.id, wetland);
};

const remove = async (id, wetland) => {
    if(!id)
        throw new HttpError(400, "id is required");

    const manager = wetland.getManager();
    const repository = manager.getRepository(ExecCycle);

    const execCycle = await repository.findOne(id);

    if(!execCycle)
        throw new HttpError(404, `ExecCycle with id ${id} not found`);
    await manager.remove(execCycle).flush();
    return execCycle;
};

const startExec = async (id, wetland) => {
    if(!id)
        throw new HttpError(400, "id is required");

    const manager = wetland.getManager();
    const repository = manager.getRepository(ExecCycle);

    const execCycle = await repository.findOne(id);
    if(!execCycle)
        throw new HttpError(404, `ExecCycle with id ${id} not found`);
    if(execCycle.status != "New")
        return Promise.reject("Execution can't be started");
    execCycle.status = "In Progress";
    await manager.flush();
    return execCycle;
};

const endExec = async (id, wetland) => {
    if(!id)
        throw new HttpError(400, "id is required");

    const manager = wetland.getManager();
    const repository = manager.getRepository(ExecCycle);

    const execCycle = await repository.findOne(id);
    if(!execCycle)
        throw new HttpError(404, `ExecCycle with id ${id} not found`);
    if(execCycle.status != "In Progress")
        throw new HttpError(400, "Execution can't be stopped");
    
    const unfinishedTests = await repository.getTestRuns(id, "New");
    if(unfinishedTests.length)
        throw new HttpError(400, "There are unfinished tests. Execution can't be stopped");

    execCycle.status = "Completed";
    await manager.flush();
    return execCycle;
};

const createClone = async (id, data, wetland) => {
    if(!id)
        throw new HttpError(400, "id is required");

    let cloneType = data && data.type;
    
    const manager = wetland.getManager();
    const repository = manager.getRepository(ExecCycle);
    const populator = wetland.getPopulator(manager);

    const execCycle = await repository.findOne(id);
    if(!execCycle)
        throw new HttpError(404, `ExecCycle with id ${id} not found`);

    const testRuns = await repository.getTestRuns(
        id,
        cloneType==CLONE_TYPES.FAILED
            ? "Fail"
            : cloneType==CLONE_TYPES.UNFINISHED
                ? "New"
                : null
    );
    // copy test cases
    const testCaseIds = testRuns.map(tr => tr.testCase);
    const testCases = await _getTestCases(testCaseIds, manager);
    
    const arrTestRuns = new ArrayCollection();
    testRuns.forEach((tr, index) => arrTestRuns.push({
        name: testCases[index].name,
        testcase: {
            id: testCases[index].id
        },
        defects: tr.defects.map(defId => ({
            id: defId
        }))
    }));
    const obj = {
        name: `Copy of ${execCycle.name}`,
        testruns: arrTestRuns
    };
    const newExecCycle = populator.assign(ExecCycle, obj, null, true);
    await manager.persist(newExecCycle).flush();
    return findById(newExecCycle.id, wetland);
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
    startExec,
    endExec,
    createClone
};
