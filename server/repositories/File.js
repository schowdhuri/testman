const path = require("path");
const { EntityRepository } = require("wetland");

const dateFormat = require("../../common/utils/dateFormat");

const { UPLOAD_DIR_ALIAS, UPLOAD_DIR } = require("../constants/paths");


class FileRepository extends EntityRepository {
    async getDetails(id) {
        const file = await super.findOne(id, { populate: "user" });
        if(!file)
            return file;
        return {
            ...file,
            created: dateFormat(file.created),
            modified: dateFormat(file.modified),
            path: path.join(UPLOAD_DIR_ALIAS, file.path)
        };
    }

    async getFile(id) {
        const file = await super.findOne(id);
        if(!file)
            return file;
        return {
            name: file.name,
            path: path.join(UPLOAD_DIR, file.path)
        };
    }
}

module.exports = FileRepository;
