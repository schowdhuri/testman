const Defect = require("../models/Defect");
const TestCase = require("../models/TestCase");
const Comment = require("../models/Comment");

const findAll = wetland => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(Defect);
    const qb = repository.getQueryBuilder("d");

    const commentRepository = manager.getRepository(Comment);

    return qb
        .leftJoin("d.description", "desc")
        .leftJoin("d.testcases", "tc")
        .select("d.id", "desc.value", "tc.id")
        .getQuery()
        .execute()
        .then(resArr => Promise.resolve(resArr.map(res => ({
            id: res["d.id"],
            description: res["desc.value"],
            testCase: res["tc.id"]
        }))))
        .then(resArr => Promise.all(resArr.map(res =>
            commentRepository.find({
                "def.id": res.id
            }, {
                alias: "def",
                populate: [ "defects", "content"]
            })
            .then(comments => Promise.resolve(comments ? comments.map(c => c.content) : []))
            .then(comments => Promise.resolve(Object.assign({}, res, {
                comments: comments
            })))
        )));
};

const findById = (id, wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(Defect);

    const defectQB = repository.getQueryBuilder("d");
    const commentRepository = manager.getRepository(Comment);
    const commentQB = commentRepository.getQueryBuilder("c");
    // return commentQB.select("c").getQuery().getResult();

    return repository.findOne(id, {
        populate: ["description", "testcases"]
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
    const tcRepository = manager.getRepository(TestCase);

    return Promise.all(obj.testCases.map(tcId => tcRepository.findOne(tcId)))
        .then(testCases => {
            testCases = testCases.filter(tc => tc);
            if(!testCases.length)
                return Promise.reject("No valid tests found");
            data.testcases = testCases.map(tc => tc.id);
            console.log("data: ", data);
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
