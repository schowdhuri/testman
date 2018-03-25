const { ArrayCollection } = require("wetland");
const parse = require("csv-parse");

const TestCase = require("../models/TestCase");

const HttpError = require("../helpers/HttpError");

const findAll = async (testPlanId, wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(TestCase);

    return await repository.findByTestPlan(testPlanId);
};

const findById = async (id, wetland) => {
    const manager = wetland.getManager();
    const repository = manager.getRepository(TestCase);

    return await repository.getDetails(id);
};

const create = async (testPlanId, data, wetland, user) => {
    if(!data.name)
        throw new HttpError(400, "name is required");

    const obj = {
        name: data.name,
        description: {
            value: data.description.value || ""
        },
        testplan: {
            id: testPlanId
        },
        user: {
            id: user.id
        }
    };

    if(data.description.attachments && data.description.attachments.length) {
        const arrAttachments = new ArrayCollection();
        data.description.attachments.forEach(a => arrAttachments.push({ id: a.id }));
        obj.description.attachments = arrAttachments;
    }

    const manager  = wetland.getManager();
    const populator = wetland.getPopulator(manager);
    const repository = manager.getRepository(TestCase);

    const testCase = populator.assign(TestCase, obj, null, true);
    await manager.persist(testCase).flush();

    return await repository.getDetails(testCase.id);
};

const bulkCreate = async (testPlanId, file, wetland, user) => {
    if(!file)
        throw new HttpError(400, "file not found");

    const processCSV = new Promise((resolve, reject) => {
        const testCases = [];
        const parser = parse({
            delimiter: ",",
            escape: "\"",
            from: 2 // skip header row
        });
        parser.on("readable", () => {
            let row;
            do {
                row = parser.read();
                if(!row)
                    break;
                testCases.push({
                    name: row[0].trim(),
                    description: row[1].trim()
                });
            } while(row);
        })
        .on("finish", function() {
            resolve(testCases);
        })
        .on("error", function(error) {
            reject(error.message);
        });
        parser.write(file.buffer.toString());
        parser.end();
    });
    const testCaseData = await processCSV;

    const manager  = wetland.getManager();
    const populator = wetland.getPopulator(manager);

    const testCases = testCaseData.map(tc => {
        const data = {
            name: tc.name,
            description: {
                value: tc.description || ""
            },
            testplan: {
                id: testPlanId
            },
            user: {
                id: user.id
            }
        };
        const testCase = populator.assign(TestCase, data);
        manager.persist(testCase);
        return testCase;
    });
    await manager.flush();
    return testCases;
};


const update = async (id, data, wetland, user) => {
    if(!id)
        throw new HttpError(400, "id is required");
    if(!data)
        throw new HttpError(400, "No data provided");

    const manager  = wetland.getManager();
    const repository = manager.getRepository(TestCase);
    const populator = wetland.getPopulator(manager);

    let testCase = await repository.findOne(id, {
        populate: [ "description", "description.attachments" ]
    });
    if(!testCase)
        throw new HttpError(404, `TestCase with id ${id} not found`);

    const obj = {
        user: {
            id: user.id
        }
    };
    if(testCase.description) {
        obj.description = {
            id: testCase.description.id,
        };
    } else {
        obj.description = {};
    }
    if(data.description.value) {
        obj.description.value = data.description.value;
    }
    if(data.description.attachments) {
        const arrAttachments = new ArrayCollection();
        obj.description.value = data.description.value;
        data.description.attachments.forEach(file => arrAttachments.push({
            id: file.id
        }));
        obj.description.attachments = arrAttachments;
    }

    const updated = populator.assign(TestCase, obj, testCase, true);
    await manager.flush();

    return updated;
};

const remove = async (id, wetland) => {
    if(!id)
        throw new HttpError(400, "id is required");

    const manager = wetland.getManager();
    const repository = manager.getRepository(TestCase);

    const testCase = await repository.findOne(id)
    if(!testCase)
        throw new HttpError(404, `TestCase with id ${id} not found`);
    await manager.remove(testCase).flush();

    return testCase;
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
    bulkCreate
};
