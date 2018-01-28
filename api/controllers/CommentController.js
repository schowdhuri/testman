const Comment = require("../models/Comment");
const Defect = require("../models/Defect");
const TestCase = require("../models/TestCase");

const findAll = wetland => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(Comment);
    const qb = repository.getQueryBuilder("c");
    return qb
        .leftJoin("c.content", "co")
        .leftJoin("c.defects", "d")
        .leftJoin("c.testcases", "tc")
        .select("c.id", "co.value", "tc.id", "d.id")
        .getQuery()
        .execute()
        .then(resArr => Promise.resolve(resArr.map(res => ({
            id: res["c.id"],
            content: res["co.value"],
            defect: res["d.id"],
            testCase: res["tc.id"]
        }))));
};

const findById = (id, wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(Comment);
    return repository.findOne(id, {
        populate: [ "content", "testcases", "defects" ]
    });
};

const create = (obj, wetland) => {
    if(!obj.content)
        return Promise.reject("content is required");
    if(!obj.testCase && !obj.defect) {
        return Promise.reject("Comment must be linked to an entity");
    }
    const data = {
        content: obj.content
    };
    const manager  = wetland.getManager();
    const populator = wetland.getPopulator(manager);
    let pLinkedEntity;
    if(obj.testCase) {
        pLinkedEntity = manager.getRepository(TestCase).findOne(obj.testCase)
    } else {
        pLinkedEntity = manager.getRepository(Defect).findOne(obj.defect)
    }
    return pLinkedEntity.then(linkedEntity => {
        if(!linkedEntity)
            return Promise.reject("Invalid ID");
        if(linkedEntity instanceof Defect)
            data.defects = [ linkedEntity ];
        else if(linkedEntity instanceof TestCase)
            data.testcases = [ linkedEntity ];
        data.content = {
            value: data.content
        };
        console.log("data: ", data);
        const comment = populator.assign(Comment, data, null, true);
        return manager
            .persist(comment)
            .flush()
            .then(() => comment);
    });
};

const update = (id, data, wetland) => {
    if(!id)
        return Promise.reject("id is required");
    if(!data)
        return Promise.reject("No data provided");

    const manager  = wetland.getManager();
    const repository = manager.getRepository(Comment);
    const populator = wetland.getPopulator(manager);
    const uow = manager.getUnitOfWork();

    return repository.findOne(id, {
        populate: [ "content" ]
    }).then(comment => {
        if(!comment)
            return Promise.reject(`Comment with id ${id} not found`);
        try {
            if(comment.content) {
                data.content = {
                    id: comment.content.id,
                    value: data.content
                };
            } else if(data.content) {
                data.content = {
                    value: data.content
                };
            }
            populator.assign(Comment, data, comment, true);
            uow.registerDirty(comment, [ "content" ]);
            return manager
                .flush()
                .then(() => comment);
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
    const repository = manager.getRepository(Comment);

    return repository.findOne(id)
        .then(comment => {
            if(!comment)
                return Promise.reject(`Comment with id ${id} not found`);
            return manager.remove(comment)
                .flush()
                .then(() => comment);
        });
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};
