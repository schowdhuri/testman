const { ArrayCollection } = require("wetland");

const Comment = require("../models/Comment");
const Defect = require("../models/Defect");
const TestCase = require("../models/TestCase");

const HttpError = require("../helpers/HttpError");

const findById = async (id, wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(Comment);
    const comment = await repository.getDetails(id);
    if(!comment)
        throw new HttpError(404, "Not found");
    return comment;
};

const create = async (data, wetland, user) => {
    if(!data.content || !data.content.value)
        throw new HttpError(400, "content is required");
    if(!data.testCase && !data.defect) {
        throw new HttpError(400, "Comment must be linked to an entity");
    }
    const obj = {
        content: data.content,
        user: {
            id: user.id
        }
    };
    const manager  = wetland.getManager();
    const populator = wetland.getPopulator(manager);
    let linkedEntity;
    if(data.testCase) {
        linkedEntity = await manager.getRepository(TestCase).findOne(data.testCase)
    } else {
        linkedEntity = await manager.getRepository(Defect).findOne(data.defect)
    }
    if(!linkedEntity)
        throw new HttpError(400, "Invalid ID");
    if(linkedEntity instanceof Defect)
        obj.defects = [ linkedEntity ];
    else if(linkedEntity instanceof TestCase)
        obj.testcases = [ linkedEntity ];

    const newComment = populator.assign(Comment, obj, null, true);
    await manager
        .persist(newComment)
        .flush();

    const comment = await findById(newComment.id, wetland);
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
    const arrAttachments = new ArrayCollection();
    (data.attachments || []).forEach(a => arrAttachments.push({
        id: a.id
    }));
    const obj = {
        content: {
            value: data.content.value,
            attachments: arrAttachments
        },
        user: {
            id: user.id
        }
    };
    if(comment.content) {
        obj.content.id = comment.content.id;
    }
    populator.assign(Comment, data, obj, true);
    uow.registerDirty(comment, [ "content" ]);
    await manager.flush();
    return await findById(id, wetland);
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
    remove
};
