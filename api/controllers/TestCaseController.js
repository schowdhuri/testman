const TestCase = require("../models/TestCase");
const Comment = require("../models/Comment");
const Defect = require("../models/Defect");

const _getComments = (testCaseID, manager) => {
    const repository = manager.getRepository(Comment);
    return repository
        .find({
            "tc.id": testCaseID
        }, {
            alias: "tc",
            populate: [ "testcases", "content"]
        })
        .then(comments => comments
            ? comments.map(c => Object.assign({}, {
                id: c.id,
                content: c.content && c.content.value
            })).filter(c => c.content)
            : []);
};

const _getDefects = (testCaseID, manager) => {
    const repository = manager.getRepository(Defect);
    const qb = repository.getQueryBuilder("d");

    return qb
        .leftJoin("d.testcases", "tc")
        .select("d")
        .where({ "tc.id": testCaseID})
        .getQuery()
        .execute()
        .then(resArr => resArr.map(res => ({
            id: res["d.id"],
            name: res["d.name"],
            status: res["d.status"]
        })));
};

const findAll = wetland => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(TestCase);

    const testCaseQB = repository.getQueryBuilder("t");
    return repository
        .find({}, {
            populate: [ "description" ]
        })
        .then(testCases => testCases.map(tc => Object.assign({}, tc, {
            description: tc.description.value
        })))
        .then(testCases => Promise.all(testCases.map(tc => _getComments(tc.id, manager)
            .then(comments => Object.assign({}, tc, {
                comments: comments.map(c => c.content)
            }))
        )))
        .then(testCases => Promise.all(testCases.map(tc => _getDefects(tc.id, manager)
            .then(defects => Object.assign({}, tc, {
                defects: defects.map(d => d && d.id)
            }))
        )));
};

const findById = (id, wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(TestCase);
    return repository.findOne(id, {
        populate: [ "description" ]
    });
};

const create = (obj, wetland) => {
    if(!obj.name)
        return Promise.reject("name is required");

    const data = {
        name: obj.name,
        description: {
            value: obj.description || ""
        },
        status: obj.status || "New" // TODO: use model lifecycle hooks
    };
    const manager  = wetland.getManager();
    const populator = wetland.getPopulator(manager);
    const testCase = populator.assign(TestCase, data);
    return manager
        .persist(testCase)
        .flush()
        .then(() => testCase);
};

const update = (id, data, wetland) => {
    if(!id)
        return Promise.reject("id is required");
    if(!data)
        return Promise.reject("No data provided");

    const manager  = wetland.getManager();
    const repository = manager.getRepository(TestCase);
    const populator = wetland.getPopulator(manager);
    const uow = manager.getUnitOfWork();

    return repository.findOne(id, {
        populate: ["description"]
    }).then(testCase => {
        if(!testCase)
            return Promise.reject(`TestCase with id ${id} not found`);
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
            populator.assign(TestCase, data, testCase, true);
            uow.registerDirty(comment, [ "description" ]);
            return manager
                .flush()
                .then(() => testCase);
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
    const repository = manager.getRepository(TestCase);

    return repository.findOne(id)
        .then(testCase => {
            if(!testCase)
                return Promise.reject(`TestCase with id ${id} not found`);
            return manager.remove(testCase)
                .flush()
                .then(() => testCase);
        });
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};
