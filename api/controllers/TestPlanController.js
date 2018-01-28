const TestPlan = require("../models/TestPlan");
const TestCase = require("../models/TestCase");

const _getTestCases = (testPlanID, manager) => {
    const repository = manager.getRepository(TestCase);
    const qb = repository.getQueryBuilder("tc");
    return qb
        .leftJoin("tc.testplan", "tp")
        .select("tc")
        .where({ "testplan_id": testPlanID })
        .getQuery()
        .execute()
        .then(resArr => resArr.map(res => ({
            id: res["tc.id"],
            name: res["tc.name"],
            status: res["tc.status"]
        })));
};

const findAll = wetland => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(TestPlan);

    return repository
        .find()
        .then(testPlans => testPlans || [])
        .then(testPlans => Promise.all(testPlans.map(tp => _getTestCases(tp.id, manager)
            .then(testCases => Object.assign({}, tp, {
                testcases: undefined,
                testCases: testCases.map(tc => tc && tc.id)
            }))
        ))).catch(ex => console.log(ex));
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

    const data = {
        name: obj.name
    };
    const manager  = wetland.getManager();
    const populator = wetland.getPopulator(manager);
    const testPlan = populator.assign(TestPlan, data);
    return manager
        .persist(testPlan)
        .flush()
        .then(() => testPlan);
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
