const { ArrayCollection } = require("wetland");

const User = require("../models/User");

const dateFormat = require("../../common/utils/dateFormat");


const findAll = async (wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(User);

    const users = await repository.find();
    return users.map(u => ({
        ...u,
        created: dateFormat(u.created),
        modified: dateFormat(u.modified)
    }));
};

const findById = async (id, wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(User);
    let user = await repository.findOne(id);
    if(!user)
        return null;
    return {
        ...user,
        created: dateFormat(user.created),
        modified: dateFormat(user.modified)
    };
};

const findOrCreate = async (authId, email, name, wetland) => {
    if(!authId)
        throw new Error("authId is required");

    const manager  = wetland.getManager();
    const repository = manager.getRepository(User);
    const populator = wetland.getPopulator(manager);

    let user = await repository.findOne({
        authid: authId
    });
    if(!user) {
        if(!email)
            throw new Error("email is required");
        const obj = {
            authid: authId,
            username: email,
            email,
            name: name || email
        };
        user = populator.assign(User, obj);
        await manager.persist(user).flush();
    }
    return user;
};

module.exports = {
    findAll,
    findById,
    findOrCreate
};
