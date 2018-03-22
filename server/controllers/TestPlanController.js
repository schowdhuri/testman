const TestPlan = require("../models/TestPlan");
const TestCase = require("../models/TestCase");

const HttpError = require("../helpers/HttpError");

const _getTestCases = async (testPlanID, manager) => {
    const repository = manager.getRepository(TestCase);
    const qb = repository.getQueryBuilder("tc");
    const testCases = await qb
        .leftJoin("tc.testplan", "tp")
        .select("tc")
        .where({ "testplan_id": testPlanID })
        .getQuery()
        .execute();

    return testCases.map(testCase => ({
        id: testCase["tc.id"],
        name: testCase["tc.name"],
        status: testCase["tc.status"]
    }));
};

const findAll = async (wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(TestPlan);

    const testPlans = await repository.find();
    if(!testPlans)
        return [];
    const result = [];
    for(let i=0; i<testPlans.length; i++) {
        const testCases = await _getTestCases(testPlans[i].id, manager);
        const { testcases, ...others } = testPlans[i]; // eslint-disable-line no-unused-vars
        result.push({
            ...others,
            testCases: testCases.map(tc => tc && tc.id)
        });
    }
    return result;
};

const findById = async (id, wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(TestPlan);
    const testPlan = await repository.findOne(id);
    if(!testPlan)
        throw new HttpError(404, `TestPlan ${id} not found`);

    const testCases = await _getTestCases(testPlan.id, manager);
    testPlan.testCases = testCases.map(tc => tc && tc.id);
    delete testPlan.testcases;
    return testPlan;
};

const create = async (obj, wetland) => {
    if(!obj.name)
        throw new HttpError(400, "name is required");

    const data = {
        name: obj.name
    };
    const manager  = wetland.getManager();
    const populator = wetland.getPopulator(manager);
    const testPlan = populator.assign(TestPlan, data);
    await manager.persist(testPlan).flush();
    return testPlan;
};

const update = async (id, data, wetland) => {
    if(!id)
        throw new HttpError(400, "id is required");
    if(!data)
        throw new HttpError(400, "No data provided");
    if(!data.name)
        throw new HttpError(400, "name is required");

    const manager  = wetland.getManager();
    const repository = manager.getRepository(TestPlan);

    const testPlan = await repository.findOne(id);
    if(!testPlan)
        throw new HttpError(404, `TestPlan with id ${id} not found`);
    testPlan.name = data.name;
    await manager.flush();
    return testPlan;
};

const remove = async (id, wetland) => {
    if(!id)
        throw new HttpError(400, "id is required");

    const manager = wetland.getManager();
    const repository = manager.getRepository(TestPlan);

    const testPlan = await repository.findOne(id);
    if(!testPlan)
        throw new HttpError(404, `TestPlan ${id} not found`);
    await manager.remove(testPlan).flush();
    return testPlan;
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};
