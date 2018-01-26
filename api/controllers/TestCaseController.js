const TestCase = require("../models/TestCase");
const Comment = require("../models/Comment");

const _getComments = (testCaseID, manager) => {
    const repository = manager.getRepository(Comment);
    return repository
        .find({
            "tc.id": testCaseID
        }, {
            alias: "tc",
            populate: [ "testcases", "content"]
        })
        .then(comments => Promise.resolve(comments
            ? comments.map(c => Object.assign({}, {
                id: c.id,
                content: c.content && c.content.value
            })).filter(c => c.content)
            : []));
};

const findAll = wetland => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(TestCase);
    const qb = repository.getQueryBuilder("tc");

    return qb
        .leftJoin("tc.description", "desc")
        .leftJoin("tc.defects", "d")
        .select("tc.id", "d.id", "desc.value")
        .getQuery()
        .execute()
        .then(resArr => Promise.resolve(resArr.map(res => ({
            id: res["tc.id"],
            description: res["desc.value"],
            defects: res["d.id"]
        }))))
        .then(resArr => Promise.all(resArr.map(res =>  _getComments(res.id, manager)
            .then(comments => Promise.resolve(Object.assign({}, res, {
                comments: comments.map(c => c.content)
            })))
        )))
        .catch(ex => console.log(ex));
};

// const findAll = wetland => {
//     const manager = wetland.getManager();
//     const repository = manager.getRepository(TestCase);

//     const testCaseQB = repository.getQueryBuilder("t");
//     return repository.find({}, {
//         populate: ["description", "defects"]
//     }).then(result => Promise.resolve(result || []));
// };

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
