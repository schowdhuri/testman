const Comment = require("../models/Comment");
const Defect = require("../models/Defect");
const TestCase = require("../models/TestCase");

const HttpError = require("../helpers/HttpError");

const findById = async (id, wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(Comment);
    const comment = await repository.findOne(id, {
        populate: [ "content", "testcases", "defects", "user" ]
    });
    return comment;
};

const create = async (obj, wetland, user) => {
    if(!obj.content)
        throw new HttpError(400, "content is required");
    if(!obj.testCase && !obj.defect) {
        throw new HttpError(400, "Comment must be linked to an entity");
    }
    const data = {
        content: obj.content,
        user: {
            id: user.id
        }
    };
    const manager  = wetland.getManager();
    const populator = wetland.getPopulator(manager);
    let linkedEntity;
    if(obj.testCase) {
        linkedEntity = await manager.getRepository(TestCase).findOne(obj.testCase)
    } else {
        linkedEntity = await manager.getRepository(Defect).findOne(obj.defect)
    }
    if(!linkedEntity)
        throw new HttpError(400, "Invalid ID");
    if(linkedEntity instanceof Defect)
        data.defects = [ linkedEntity ];
    else if(linkedEntity instanceof TestCase)
        data.testcases = [ linkedEntity ];
    data.content = {
        value: data.content
    };

    const newComment = populator.assign(Comment, data, null, true);
    await manager
        .persist(newComment)
        .flush();

    const comment = await findById(newComment.id, wetland);
    return comment;
};

const attachFile = async(id, file, wetland, user) => {
    if(!id)
        throw new HttpError(400, "id is required");
    if(!file)
        throw new HttpError(400, "File not found");
    const manager = wetland.getManager();
    const repository = manager.getRepository(Comment);
    const comment = await repository.findOne(id);
    console.log(file);
    return comment;
};

const update = async (id, data, wetland, user) => {
    if(!id)
        throw new HttpError(400, "id is required");
    if(!data)
        throw new HttpError(400, "No data provided");

    const manager  = wetland.getManager();
    const repository = manager.getRepository(Comment);
    const populator = wetland.getPopulator(manager);
    const uow = manager.getUnitOfWork();

    const comment = await repository.findOne(id, {
        populate: [ "content", "user" ]
    });
    if(!comment)
        throw new HttpError(404, `Comment with id ${id} not found`);
    if(comment.user && comment.user.id != user.id) {
        throw new HttpError(400, "Can't edit comment from another user");
    }
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
    data.user = {
        id: user.id
    };
    const updated = populator.assign(Comment, data, comment, true);
    uow.registerDirty(comment, [ "content" ]);
    await manager.flush();
    return updated;
};

const remove = async (id, wetland, user) => {
    if(!id)
        throw new HttpError(400, "id is required");

    const manager = wetland.getManager();
    const repository = manager.getRepository(Comment);

    const comment = await repository.findOne(id)
    if(!comment)
        throw new HttpError(404, `Comment with id ${id} not found`);
    if(comment.user && !comment.user.id != user.id) {
        throw new HttpError(400, "Can't delete comment from another user");
    }
    await manager.remove(comment).flush();
    return comment;
};

module.exports = {
    findById,
    create,
    update,
    remove,
    attachFile
};
