const TestCase = require("../models/TestCase");
const Comment = require("../models/Comment");
const findAll = wetland => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(TestCase);

    const testCaseQB = repository.getQueryBuilder("t");
    // const commentRepository = manager.getRepository(Comment);
    // const queryBuilder2 = commentRepository.getQueryBuilder("c");
    // queryBuilder1.select("c");
    // queryBuilder2.innerJoin("c.id", "comments.id");
    // console.log(queryBuilder1.select("t").getQuery().getResult());
    // const commentRepository = manager.getRepository(Comment);
    // const commentQB = commentRepository.getQueryBuilder("c");
    // return commentQB.select("id", "linkedDefect").getQuery().getResult();
    // return queryBuilder1.select("comment_id").getQuery().getResult();
    return repository.find({}, {
        populate: ["description", "defects"]
    }).then(result => Promise.resolve(result || []));
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
            console.log("data: ", data)
            populator.assign(TestCase, data, testCase, true);
            console.log("updated: ", testCase)
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
