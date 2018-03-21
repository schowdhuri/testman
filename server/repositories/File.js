const fs = require("fs");
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

    async getAll(criteria, options={}) {
        if(options.populate) {
            if(options.populate instanceof Array)
                options.populate.push("user");
            else
                options.populate = [ options.populate, "user" ]
        }
        const files = await super.find(criteria, options);
        console.log("files: ", files)
        if(!files)
            return [];
        return files.map(file => ({
            ...file,
            created: dateFormat(file.created),
            modified: dateFormat(file.modified),
            path: path.join(UPLOAD_DIR_ALIAS, file.path)
        }));
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

    async remove(file) {
        await new Promise((resolve, reject) => {
            fs.unlink(path.join(UPLOAD_DIR, file.path), err => {
                if(err)
                    return reject(err);
                return resolve();
            });
        });
        const manager = this.getEntityManager();
        await manager.remove(file).flush();
        return file;
    }
}

module.exports = FileRepository;
