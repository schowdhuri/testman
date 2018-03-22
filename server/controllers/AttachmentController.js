const File = require("../models/File");

const HttpError = require("../helpers/HttpError");

const findById = async (id, wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(File);
    const attachment = await repository.findOne(id);

    if(!attachment)
        throw new HttpError(404, `File ${id} not found`);

    return attachment;
};

const download = async (id, wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(File);
    const file = await repository.getFile(id);
    if(!file)
        throw new HttpError(404, "File not found");
    return file;
};

const create = async (file, wetland, user) => {
    if(!file)
        throw new HttpError(400, "file is required");

    const obj = {
        name: file.originalname,
        path: file.filename,
        user: {
            id: user.id
        }
    };
    const manager  = wetland.getManager();
    const populator = wetland.getPopulator(manager);
    const repository = manager.getRepository(File);

    const attachment = populator.assign(File, obj);
    manager.persist(attachment)
    await manager.flush();

    return await repository.getDetails(attachment.id);
};

const update = async (id, data, wetland, user) => {
    if(!id)
        throw new HttpError(400, "id is required");
    if(!data)
        throw new HttpError(400, "no data");
    if(!data.name)
        throw new HttpError(400, "name is required");

    const manager  = wetland.getManager();
    const repository = manager.getRepository(File);
    const populator = wetland.getPopulator(manager);

    const attachment = await repository.findOne(id, { populate: "user" });

    if(!attachment)
        throw new HttpError(404, `File with id ${id} not found`);

    const obj = {
        name: data.name,
        user: {
            id: user.id
        }
    };

    populator.assign(File, obj, attachment, true);
    await manager.flush();

    return await repository.getDetails(id);
};

const remove = async (id, wetland) => {
    if(!id)
        throw new HttpError(400, `id is required`);

    const manager = wetland.getManager();
    const repository = manager.getRepository(File);

    const attachment = await repository.findOne(id);

    if(!attachment)
        throw new HttpError(404, `File with id ${id} not found`);

    return await repository.remove(attachment);
};

module.exports = {
    findById,
    create,
    update,
    remove,
    download
};
