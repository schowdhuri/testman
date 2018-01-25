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
        .then(comments => Promise.resolve(comments ? comments.map(c => c.content) : []));
};

const findAll = wetland => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(Defect);
    const qb = repository.getQueryBuilder("d");

    return qb
        .leftJoin("d.description", "desc")
        .leftJoin("d.testcases", "tc")
        .select("d.id", "tc.id", "desc.value")
        .getQuery()
        .execute()
        .then(resArr => Promise.resolve(resArr.map(res => ({
            id: res["d.id"],
            description: res["desc.value"],
            testCases: res["tc.id"]
        }))))
        .then(resArr => Promise.all(resArr.map(res =>  _getComments(res.id, manager)
            .then(comments => Promise.resolve(Object.assign({}, res, {
                comments: comments.map(c => c.value)
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

const _assignTestCases = (defectData, tcIDs, manager) => {
    const repository = manager.getRepository(TestCase);
    return Promise.all(tcIDs.map(tcID => repository.findOne(tcId)))
        .then(testCases => {
            testCases = testCases.filter(tc => tc);
            if(!testCases.length)
                return Promise.reject("No valid tests found");
            return Promise.resolve(Object.assign({}, data, {
                testCases
            }));
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

const create = (obj, wetland) => {
    if(!obj.name)
        return Promise.reject("name is required");
    if(!obj.testCases || !obj.testCases.length)
        return Promise.reject("Defect must be tagged to one or more tests");
    const data = {
        name: obj.name,
        description: {
            value: obj.description || ""
        },
        status: obj.status || "Open", // TODO: use model lifecycle hooks
    };
    const manager  = wetland.getManager();
    const populator = wetland.getPopulator(manager);

    return _assignTestCases(data, obj.testCases, manager)
        .then(data => {
            const defect = populator.assign(Defect, data, null, true);
            return manager
                .persist(defect)
                .flush()
                .then(() => defect);
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
