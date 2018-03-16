const { ArrayCollection } = require("wetland");

const Defect = require("../models/Defect");
const File = require("../models/File");
const TestCase = require("../models/TestCase");
const Comment = require("../models/Comment");

const STATES = require("../../common/constants/DefectStates");
const dateFormat = require("../../common/utils/dateFormat");
const HttpError = require("../helpers/HttpError");


const _getComments = async (defectID, manager) => {
    const repository = manager.getRepository(Comment);
    const comments = await repository
        .find({
            "c.defects_id": defectID
        }, {
            alias: "c",
            populate: [ "content" ]
        });
    if(!comments)
        return [];
    return comments
        .map(c => ({
            id: c.id,
            content: c.content && c.content.value,
            created: dateFormat(c.created),
            modified :dateFormat(c.modified)
        }))
        .filter(c => c.content);
};

const findAll = async (wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(Defect);
    const qb = repository.getQueryBuilder("d");

    let defects = await qb
        .leftJoin("d.description", "desc")
        .leftJoin("d.testcases", "tc")
        .leftJoin("d.assignee", "assignee")
        .select("d", "tc", "desc", "assignee")
        .getQuery()
        .getResult();

    if(!defects)
        return [];

    defects = defects.map(defect => {
        const d = {
            ...defect,
            description: defect.description.value,
            testCases: defect.testcases
        };
        delete d.testcases;
        return d;
    });
    for(let i=0; i< defects.length; i++) {
        const comments = await _getComments(defects[i].id, manager);
        defects[i].comments = comments.map(c => c.content);
    }
    return defects;
};

const findById = async (id, wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(Defect);
    let defect = await repository
        .findOne(id, {
            populate: [
                "description",
                "testcases",
                "testruns",
                "testruns.testcase",
                "testcases.testplan",
                "assignee"
            ]
        });

    if(!defect)
        throw new HttpError(404, `Defect ${id} not found`);

    const testCases = defect.testcases.map(tc => ({
        id: tc.id,
        name: tc.name,
        testPlan: tc.testplan && tc.testplan.id
    }));
    const testRuns = defect.testruns.map(tr => ({
        id: tr.id,
        status: tr.status,
        testCase: {
            id: tr.testcase.id
        }
    }));
    defect = {
        ...defect,
        testCases,
        testRuns,
        created: defect.created && dateFormat(defect.created),
        modified: defect.modified && dateFormat(defect.modified)
    };
    delete defect.testcases;
    delete defect.testruns;

    const comments = await _getComments(defect.id, manager);
    return {
        ...defect,
        comments
    };
};

const _getTestCases = async (tcIDs, manager) => {
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

const attachFile = async(id, file, wetland, user) => {
    if(!id)
        throw new HttpError(400, "id is required");

    if(!file)
        throw new HttpError(400, "No file");

    const manager = wetland.getManager();
    const repository = manager.getRepository(Defect);
    const populator = wetland.getPopulator(manager);

    const defect = await repository.findOne(id, { populate: [ "description" ] });

    const attachmentData = {
        name: file.originalname,
        path: file.filename
    };
    const attachment = populator.assign(File, attachmentData);
    manager.persist(attachment);
    defect.description.attachments.push(attachment);
    await manager.flush();

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
        populate: [ "description", "testcases", "assignee" ]
    });

    if(!defect)
        throw new HttpError(404, `Defect with id ${id} not found`);
    const arrTestCases = new ArrayCollection();
    const obj = {};
    if(defect.description) {
        obj.description = {
            id: defect.description.id,
            value: data.description
        };
    } else if(data.description) {
        obj.description = {
            value: data.description
        };
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
    attachFile,
    update,
    remove,
    bulkRemove
};
