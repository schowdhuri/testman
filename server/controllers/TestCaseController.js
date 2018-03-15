const parse = require("csv-parse");

const TestCase = require("../models/TestCase");
const TestPlan = require("../models/TestPlan");
const Comment = require("../models/Comment");
const Defect = require("../models/Defect");

const dateFormat = require("../../common/utils/dateFormat");
const HttpError = require("../helpers/HttpError");

const _getComments = async (testCaseID, manager) => {
    const repository = manager.getRepository(Comment);
    const comments = await repository.find({
        "tc.id": testCaseID
    }, {
        populate: [ {"testcases": "tc"}, "content", "user" ]
    });
    if(!comments)
        return [];

    return comments
        .map(c => {
            const user = c.user ? {
                id: c.user.id,
                name: c.user.name,
                email: c.user.email
            } : null;
            return {
                id: c.id,
                content: c.content && c.content.value,
                created: c.created,
                modified: c.modified,
                user
            };
        })
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
        .leftJoin("tc.user", "user")
        .select("tc", "tp.id", "def", "user")
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
            testPlan: tc.testplan.id
        };
        delete testCase.testplan;
        return testCase;
    });

    for(let i=0; i<testCases.length; i++) {
        const comments = await _getComments(testCases[i].id, manager);
        testCases[i].comments = comments.map(c => c.content);
    }

    return testCases;
};

const findById = async (id, wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(TestCase);

    const testCase = await repository.findOne(id, {
        populate: [ "description", "testplan", "defects", "user" ]
    });

    testCase.created = dateFormat(testCase.created);
    testCase.modified = dateFormat(testCase.modified);

    const comments = await _getComments(testCase.id, manager);
    return {
        ...testCase,
        comments
    };
};

const create = async (testPlanId, obj, wetland, user) => {
    if(!obj.name)
        throw new HttpError(400, "name is required");

    const data = {
        name: obj.name,
        description: {
            value: obj.description || ""
        },
        testplan: {
            id: testPlanId
        },
        user: {
            id: user.id
        }
    };
    const manager  = wetland.getManager();
    const populator = wetland.getPopulator(manager);
    const testCase = populator.assign(TestCase, data);
    await manager.persist(testCase).flush();
    return testCase;
};

const bulkCreate = async (testPlanId, file, wetland, user) => {
    if(!file)
        throw new HttpError(400, "file not found");
    const processCSV = new Promise((resolve, reject) => {
        const testCases = [];
        const parser = parse({
            delimiter: ",",
            escape: "\"",
            from: 2 // skip header row
        });
        parser.on("readable", () => {
            let row;
            while(row = parser.read()) {
                testCases.push({
                    name: row[0].trim(),
                    description: row[1].trim()
                });
            }
        })
        .on("finish", function() {
            resolve(testCases);
        })
        .on("error", function(error) {
            reject(error.message);
        });
        parser.write(file.data.toString());
        parser.end();
    });
    const testCaseData = await processCSV;

    const manager  = wetland.getManager();
    const populator = wetland.getPopulator(manager);

    const testCases = testCaseData.map(tc => {
        const data = {
            name: tc.name,
            description: {
                value: tc.description || ""
            },
            testplan: {
                id: testPlanId
            },
            user: {
                id: user.id
            }
        };
        const testCase = populator.assign(TestCase, data);
        manager.persist(testCase);
        return testCase;
    });
    await manager.flush();
    return testCases;
};


const update = async (id, data, wetland, user) => {
    if(!id)
        throw new HttpError(400, "id is required");
    if(!data)
        throw new HttpError(400, "No data provided");

    const manager  = wetland.getManager();
    const repository = manager.getRepository(TestCase);
    const populator = wetland.getPopulator(manager);
    const uow = manager.getUnitOfWork();

    let testCase = repository.findOne(id, {
        populate: ["description"]
    });
    if(!testCase)
        throw new HttpError(404, `TestCase with id ${id} not found`);
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
        data.user = {
            id: user.id
        };
        const updated = populator.assign(TestCase, data, testCase, true);
        // uow.registerDirty(testCase, [ "description" ]);
        await manager.flush();
        return updated;
    } catch(ex) {
        console.log(ex);
        throw ex;
    }
};

const remove = async (id, wetland) => {
    if(!id)
        throw new HttpError(400, "id is required");

    const manager = wetland.getManager();
    const repository = manager.getRepository(TestCase);

    const testCase = await repository.findOne(id)
    if(!testCase)
        throw new HttpError(404, `TestCase with id ${id} not found`);
    return manager.remove(testCase).flush();
    return testCase;
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
    bulkCreate
};
