const Model = require("../models").TestCase;

const findAll = () => {
    return Model.findAll();
};

const findById = id => {
    return Model.findById(id);
};

const create = data => {
    const name = data.name;
    const description = data.description;
    if(!name)
        return Promise.reject("name is required");
    return Model.create({
        name,
        description
    });
};

const update = (id, data) => {
    if(!id)
        return Promise.reject("id is required");
    if(!data)
        return Promise.reject("No data provided");
    return findById(id)
        .then(model => {
            if(!model)
                return Promise.reject(`Entity with id ${id} not found`);
            return model.update({
                name: data.name,
                description: data.description
            });
        });
};

const remove = id => {
    if(!id)
        return Promise.reject("id is required");
    return findById(id)
        .then(model => {
            if(!model)
                return Promise.reject(`Entity with id ${id} not found`);
            return model.destroy();
        });
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};
