const TestCase = require("../models/TestCase");
const TestPlan = require("../models/TestPlan");
const Comment = require("../models/Comment");
const Defect = require("../models/Defect");

const dateFormat = require("../../common/utils/dateFormat");

const _getComments = async (testCaseID, manager) => {
    const repository = manager.getRepository(Comment);
    const comments = await repository.find({
        "tc.id": testCaseID
    }, {
        populate: [ {"testcases": "tc"}, "content" ]
    });
    if(!comments)
        return [];

    return comments
        .map(c => Object.assign({}, {
            id: c.id,
            content: c.content && c.content.value,
            created: c.created,
            modified: c.modified
        }))
        .filter(c => c.content);
};

const _getDefects = async (testCaseID, manager) => {
    const repository = manager.getRepository(Defect);
    const qb = repository.getQueryBuilder("d");

    const resArr = await qb
        .leftJoin("d.testcases", "tc")
        .select("d")
        .where({ "tc.id": testCaseID })
        .getQuery()
        .execute();

    return resArr.map(res => ({
        id: res["d.id"],
        name: res["d.name"],
        status: res["d.status"]
    }));
};

const findAll = async (testPlanId, wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(TestCase);

    const qb = repository.getQueryBuilder("tc");
    const resArr = await qb
        .leftJoin("tc.testplan", "tp")
        .leftJoin("tc.defects", "def")
        .select("tc", "tp.id", "def")
        .where({ "tp.id": testPlanId })
        .getQuery()
        .getResult();

    if(!resArr) {
        return [];
    }

    const testCases = resArr.map(tc => {
        const testCase = {
            ...tc,
            created: dateFormat(tc.created),
            modified: dateFormat(tc.modified),
            testPlan: tc.testplan.id,
        };
        delete testCase.testplan;
        return testCase;
    });

    for(let i=0; i<testCases.length; i++) {
        let comments = await _getComments(testCases[i].id, manager);
        testCases[i].comments = comments.map(c => c.content);
    }
    
    return testCases;
};

const findById = async (id, wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(TestCase);
    
    const testCase = await repository.findOne(id, {
        populate: [ "description", "testplan", "defects" ]
    });

    testCase.created = dateFormat(testCase.created);
    testCase.modified = dateFormat(testCase.modified);

    const comments = await _getComments(testCase.id, manager);
    testCase.comments = comments;
    return testCase;
};

const create = async (testPlanId, obj, wetland) => {
    if(!obj.name)
        throw new Error("name is required");

    const data = {
        name: obj.name,
        description: {
            value: obj.description || ""
        },
        testplan: {
            id: testPlanId
        }
    };
    const manager  = wetland.getManager();
    const populator = wetland.getPopulator(manager);
    const testCase = populator.assign(TestCase, data);
    await manager
        .persist(testCase)
        .flush();    
    return testCase;
};

const update = async (id, data, wetland) => {
    if(!id)
        throw new Error("id is required");
    if(!data)
        throw new Error("No data provided");

    const manager  = wetland.getManager();
    const repository = manager.getRepository(TestCase);
    const populator = wetland.getPopulator(manager);
    const uow = manager.getUnitOfWork();

    let testCase = repository.findOne(id, {
        populate: ["description"]
    });
    if(!testCase)
        throw new Error(`TestCase with id ${id} not found`);
    try {
        if(testCase.description) {
            data.description = {
                id: testCase.description.id,
                value: data.description
            };
        } else if(data.description) {
            data.description = {
                value: data.description
            };
        }
        const updated = populator.assign(TestCase, data, testCase, true);
        // uow.registerDirty(testCase, [ "description" ]);
        await manager
            .flush();
        return updated;    
    } catch(ex) {
        console.log(ex);
        throw ex;
    }
};

const remove = async (id, wetland) => {
    if(!id)
        throw new Error("id is required");

    const manager = wetland.getManager();
    const repository = manager.getRepository(TestCase);

    const testCase = await repository.findOne(id)
    if(!testCase)
        throw new Error(`TestCase with id ${id} not found`);
    return manager.remove(testCase)
        .flush();
    return testCase;
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};
