const { ArrayCollection } = require("wetland");

const Defect = require("../models/Defect");
const TestCase = require("../models/TestCase");
const Comment = require("../models/Comment");

const STATES = require("../../common/constants/DefectStates");
const dateFormat = require("../../common/utils/dateFormat");

const _getComments = (defectID, manager) => {
    const repository = manager.getRepository(Comment);
    return repository
        .find({
            "c.defects_id": defectID
        }, {
            alias: "c",
            populate: [ "content" ]
        })
        .then(comments => Promise.resolve(comments
            ? comments.map(c => Object.assign({}, {
                id: c.id,
                content: c.content && c.content.value,
                created: dateFormat(c.created),
                modified :dateFormat(c.modified)
            })).filter(c => c.content)
            : [])
        );
};

const findAll = wetland => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(Defect);
    const qb = repository.getQueryBuilder("d");

    return qb
        .leftJoin("d.description", "desc")
        .leftJoin("d.testcases", "tc")
        .select("d", "tc", "desc")
        .getQuery()
        .getResult()
        .then(defects => Promise.resolve(defects.map(defect => Object.assign({}, defect, {
            description: defect.description.value,
            testCases: defect.testcases,
            testcases: undefined
        }))))
        .then(defects => Promise.all(defects.map(defect => _getComments(defect.id, manager)
            .then(comments => Promise.resolve(Object.assign({}, defect, {
                comments: comments.map(c => c.content)
            })))
        )))
        .catch(ex => console.log(ex));
};

const findById = (id, wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(Defect);
    const qb = repository.getQueryBuilder("d");

    return qb
        .leftJoin("d.description", "desc")
        .leftJoin("d.testcases", "tc")
        .leftJoin("d.testruns", "tr")
        .leftJoin("tc.testplan", "tp")
        .select("d", "tc.id", "tc.name", "tp.id", "tr.id", "desc.id", "desc.value")
        .where({ "d.id": id })
        .getQuery()
        .getResult()
        .then(defects => {
            const defect = defects[0];
            return Object.assign({}, defects[0], {
                testCases: defect.testcases.map(tc => Object.assign({}, tc, {
                    testPlan: tc.testplan && tc.testplan.id,
                    testplan: undefined,
                    defects: undefined,
                    comments: undefined
                })),
                testcases: undefined,
                testRuns: defect.testruns,
                testruns: undefined,
                created: defect.created && dateFormat(defect.created),
                modified: defect.modified && dateFormat(defect.modified)
            });
        })
        .then(defect => {
            return _getComments(defect.id, manager)
                .then(comments => Promise.resolve(Object.assign({}, defect, {
                    comments: comments
                })));
        })
        .catch(ex => console.log(ex));
};

const _getTestCases = (tcIDs, manager) => {
    const repository = manager.getRepository(TestCase);
    const arrTestCases = new ArrayCollection();
    tcIDs = tcIDs.filter(tcID => tcID);
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

    const arrTestRuns = new ArrayCollection();
    data.testRuns.forEach(tr => arrTestRuns.push({
        id: tr
    }));
    obj.testruns = arrTestRuns;

    const manager  = wetland.getManager();
    const populator = wetland.getPopulator(manager);

    return _getTestCases(data.testCases, manager)
        .then(testCases => {
            obj.testcases = testCases;
            console.log(obj);
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
        populate: [ "description", "testcases", "defects" ]
    }).then(defect => {
        if(!defect)
            return Promise.reject(`Defect with id ${id} not found`);
        const arrTestCases = new ArrayCollection();

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

        data.testCases.forEach(tc => arrTestCases.push({ id: tc }));
        data.testcases = arrTestCases;

        const updated = populator.assign(Defect, data, defect, true);
        return manager
            .flush()
            .then(() => updated);
    })
    .catch(ex => console.log(ex));
};

const remove = (id, wetland) => {
    if(!id)
        return Promise.reject("id is required");

    const manager = wetland.getManager();
    const repository = manager.getRepository(Defect);

    return repository.findOne(id)
        .then(defect => {
            if(!defect) {
                return Promise.reject(`Defect with id ${id} not found`);
            }
            if(defect.status != STATES[3]) {
                return Promise.reject(`Can only delete Non-Issue defects`);
            }
            return manager.remove(defect)
                .flush()
                .then(() => defect);
        });
};

const bulkRemove = (payload, wetland) => {
    if(!payload.ids || !payload.ids.length)
        return Promise.reject("ids required");
    const ids = payload.ids;
    const manager = wetland.getManager();
    const repository = manager.getRepository(Defect);

    const pArrDelete = ids.map(id => repository.findOne(id)
        .then(defect => {
            if(!defect) {
                return Promise.reject(`Defect #${id} not found`);
            }
            if(defect.status != STATES[3]) {
                return Promise.reject(`Can only delete Non-Issue defects`);
            }
            manager.remove(defect);
        }));
    return Promise.all(pArrDelete)
        .then(() => manager.flush().then(() => ids));
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
    bulkRemove
};
