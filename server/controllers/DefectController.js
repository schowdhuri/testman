const { ArrayCollection } = require("wetland");

const Defect = require("../models/Defect");
const TestCase = require("../models/TestCase");

const STATES = require("../../common/constants/DefectStates");
const HttpError = require("../helpers/HttpError");


const findAll = async (wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(Defect);
    const defects = await repository.findAll();
    return defects;
};

const findById = async (id, wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(Defect);
    let defect = await repository.getDetails(id);

    if(!defect)
        throw new HttpError(404, `Defect ${id} not found`);

    return defect;
};

const _getTestCases = async (tcIDs, manager) => { // TODO move to DefectRepo
    const repository = manager.getRepository(TestCase);
    const arrTestCases = new ArrayCollection();
    tcIDs = tcIDs.filter(tcID => tcID);
    let testCases = [];
    for(let i=0; i<tcIDs.length; i++) {
        const testCase = await repository.findOne(tcIDs[i]);
        testCases.push(testCase);
    }
    testCases = testCases.filter(tc => tc);
    if(!testCases.length)
        throw new HttpError(400, "No valid tests found");

    testCases.forEach(tc => arrTestCases.push(tc));
    return arrTestCases;
};

const create = async (data, wetland, user) => {
    if(!data.name)
        throw new HttpError(400, "name is required");
    if(!data.description)
        throw new HttpError(400, "description is required");
    if(!data.testCases || !data.testCases.length)
        throw new HttpError(400, "Defect must be tagged to one or more tests");
    const obj = {
        name: data.name,
        description: {
            value: data.description || ""
        },
        user: {
            id: user.id
        }
    };
    if(data.status)
        obj.status = data.status;

    const arrTestRuns = new ArrayCollection();
    data.testRuns.forEach(tr => arrTestRuns.push({
        id: tr
    }));
    obj.testruns = arrTestRuns;

    const manager  = wetland.getManager();
    const populator = wetland.getPopulator(manager);

    const testCases = await _getTestCases(data.testCases, manager)
    obj.testcases = testCases;
    let defect = populator.assign(Defect, obj, null, true);
    await manager.persist(defect).flush();
    defect = {
        ...defect,
        testCases: defect.testcases
    };
    delete defect.testCases;
    return defect;
};

const update = async (id, data, wetland) => {
    if(!id)
        throw new HttpError(400, "id is required");
    if(!data)
        throw new HttpError(400, "no data");

    const manager  = wetland.getManager();
    const repository = manager.getRepository(Defect);
    const populator = wetland.getPopulator(manager);

    let defect = await repository.findOne(id, {
        populate: [ "description", "description.attachments", "testcases", "assignee" ]
    });

    if(!defect)
        throw new HttpError(404, `Defect with id ${id} not found`);

    const arrTestCases = new ArrayCollection();
    const obj = {};
    if(defect.description) {
        obj.description = {
            id: defect.description.id
        };
    } else {
        obj.description = {};
    }
    if(data.description) {
        const arrAttachments = new ArrayCollection();
        obj.description.value = data.description.value;
        data.description.attachments.forEach(file => arrAttachments.push({
            id: file.id
        }));
        obj.description.attachments = arrAttachments;
    }
    if((!defect.assignee && data.assignee) ||
        (defect.assignee && data.assignee && data.assignee.id != defect.assignee.id)
    ) {
        // assignee changed
        obj.assignee = {
            id: data.assignee.id
        };
    }

    data.testCases.forEach(tc => arrTestCases.push({ id: tc }));
    obj.testcases = arrTestCases;

    const updated = populator.assign(Defect, obj, defect, true);
    await manager.flush();

    return updated;
};

const remove = async (id, wetland) => {
    if(!id)
        throw new HttpError(400, `id is required`);

    const manager = wetland.getManager();
    const repository = manager.getRepository(Defect);

    const defect = await repository.findOne(id)
    if(!defect) {
        throw new HttpError(404, `Defect with id ${id} not found`);
    }
    if(defect.testCases &&
        defect.testCases.length &&
        defect.status != STATES[3]
    ) {
        throw new HttpError(400, "Can only delete Non-Issue defects");
    }
    await manager.remove(defect).flush();
    return defect;
};

const bulkRemove = async (payload, wetland) => {
    if(!payload.ids || !payload.ids.length)
        throw new HttpError(400, `ids required`);
    const ids = payload.ids;
    const manager = wetland.getManager();
    const repository = manager.getRepository(Defect);

    for(let i=0; i< ids.length; i++) {
        const defect = await repository.findOne(ids[i]);
        if(!defect) {
            throw new HttpError(404, `Defect with id ${ids[i]} not found`);
        }
        if(defect.status != STATES[3]) {
            throw new HttpError(400, "Can only delete Non-Issue defects");
        }
        manager.remove(defect);
    }
    await manager.flush();
    return ids;
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
    bulkRemove
};
