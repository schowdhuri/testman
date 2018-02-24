const { ArrayCollection } = require("wetland");

const Defect = require("../models/Defect");
const TestCase = require("../models/TestCase");
const Comment = require("../models/Comment");

const _getComments = (defectID, manager) => {
    const repository = manager.getRepository(Comment);
    return repository
        .find({
            "def.id": defectID
        }, {
            alias: "def",
            populate: [ "defects", "content"]
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
    const repository = manager.getRepository(Defect);
    const qb = repository.getQueryBuilder("d");

    return qb
        .leftJoin("d.description", "desc")
        .leftJoin("d.testcases", "tc")
        .select("d", "tc.id", "desc.value")
        .getQuery()
        .execute()
        .then(resArr => Promise.resolve(resArr.map(res => ({
            id: res["d.id"],
            name: res["d.name"],
            status: res["d.status"],
            description: res["desc.value"],
            testCases: res["tc.id"] ? [ res["tc.id"] ] : null
        }))))
        .then(resArr => Promise.all(resArr.map(res =>  _getComments(res.id, manager)
            .then(comments => Promise.resolve(Object.assign({}, res, {
                comments: comments.map(c => c.content)
            })))
        )));
};

const findById = (id, wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(Defect);

    return repository
        .findOne(id, {
            populate: [ "description", "testcases" ]
        })
        .then(defect => {
            return _getComments(defect.id, manager)
                .then(comments => Promise.resolve(Object.assign({}, defect, {
                    comments: comments
                })));
        });
};

const _getTestCases = (tcIDs, manager) => {
    const repository = manager.getRepository(TestCase);
    const arrTestCases = new ArrayCollection();
    return Promise.all(tcIDs.map(tcID => repository.findOne(tcID)))
        .then(testCases => {
            testCases = testCases.filter(tc => tc);
            if(!testCases.length)
                return Promise.reject("No valid tests found");
            testCases.forEach(tc => arrTestCases.push(tc));
            return Promise.resolve(arrTestCases);
        });
};

const _assignComments = (defectData, comments, manager) => {
    const repository = manager.getRepository(Comment);
    const arrComments = new ArrayCollection();
    Promise.all(comments.map(comment => {
        if(typeof(comment==="string")) {
            // new comment
            return Promise.resolve({ value: comment });
        } else if(comment && comment.id && comment.content) {
            repository.findOne(comment.id, {
                populate: "description"
            }).then(commentEntity => {
                if(!commentEntity)
                    return Promise.reject(`Invalid comment ${comment.id}`);
                commentData = Object.assign({}, commentEntity, {
                    id: comment.content.id,
                    value: comment.content.value
                });
                // populator.assign(Comment, commentData, commentEntity, true);
                return Promise.resolve(commentData)
            });
        }
    })).then(commentObjects => {
        commentObjects.forEach(c => arrComments.push(c));
        return Promise.resolve(arrComments);
    });
};

const create = (data, wetland) => {
    if(!data.name)
        return Promise.reject("name is required");
    if(!data.description)
        return Promise.reject("description is required");
    if(!data.testCases || !data.testCases.length)
        return Promise.reject("Defect must be tagged to one or more tests");
    const obj = {
        name: data.name,
        description: {
            value: data.description || ""
        }
    };
    if(data.status)
        obj.status = data.status;
    const manager  = wetland.getManager();
    const populator = wetland.getPopulator(manager);

    return _getTestCases(data.testCases, manager)
        .then(testCases => {
            obj.testcases = testCases;
            console.log("obj: ", obj)
            const defect = populator.assign(Defect, obj, null, true);
            return manager
                .persist(defect)
                .flush()
                .then(() => Object.assign({}, defect, {
                    testCases: defect.testCases,
                    testcases: undefined
                }));
        });
};

const update = (id, data, wetland) => {
    if(!id)
        return Promise.reject("id is required");
    if(!data)
        return Promise.reject("No data provided");

    const manager  = wetland.getManager();
    const repository = manager.getRepository(Defect);
    const populator = wetland.getPopulator(manager);
    // const uow = manager.getUnitOfWork();

    return repository.findOne(id, {
        populate: ["description"]
    }).then(defect => {
        if(!defect)
            return Promise.reject(`Defect with id ${id} not found`);
        try {
            if(defect.description) {
                data.description = {
                    id: defect.description.id,
                    value: data.description
                };
            } else if(data.description) {
                data.description = {
                    value: data.description
                };
            }
            populator.assign(Defect, data, defect, true);
            // uow.registerDirty(comment, [ "description" ]);
            return manager
                .flush()
                .then(() => defect);
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
    const repository = manager.getRepository(Defect);

    return repository.findOne(id)
        .then(defect => {
            if(!defect)
                return Promise.reject(`Defect with id ${id} not found`);
            return manager.remove(defect)
                .flush()
                .then(() => defect);
        });
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};
