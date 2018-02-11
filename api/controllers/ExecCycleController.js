const ExecCycle = require("../models/ExecCycle");
const TestRun = require("../models/TestRun");

const _getTestRuns = (execCycleId, manager) => {
    const repository = manager.getRepository(TestRun);
    const qb = repository.getQueryBuilder("tr");
    return qb
        .leftJoin("tr.execcycle", "ec")
        .select("tr.id", "tr.status")
        .where({ "tr.execcycle_id": execCycleId })
        .getQuery()
        .execute()
        .then(resArr => resArr.map(res => ({
            id: res["tr.id"],
            status: res["tr.status"]
        })));
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
        });
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
    if(!data.testRuns)
        return Promise.reject("testRuns required");
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
            data.testruns = data.testRuns.map(tr => ({
                id: tr
            }));
            populator.assign(ExecCycle, data, cycle, true);
            uow.registerDirty(cycle, [ "testruns" ]);
            return manager
                .flush()
                .then(() => cycle);
        } catch(ex) {
            console.log(ex);
            return Promise.reject(ex);
        }
    }).catch(ex => console.log(ex));
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
