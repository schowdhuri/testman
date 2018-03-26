const { EntityRepository } = require("wetland");

const File = require("../models/File");

const dateFormat = require("../../common/utils/dateFormat");


class CommentRepository extends EntityRepository {
    async getAttachments(comment, fileRepo) {
        const attachments = await fileRepo.getAll({
            "richtext_id": comment.content.id
        }, {
            populate: [
                { "richtext": "rt" }
            ]
        });
        return attachments.map(a => ({
            id: a.id,
            name: a.name,
            path: a.path,
            created: dateFormat(a.created),
            modified: dateFormat(a.modified),
            user: a.user ? {
                id: a.user.id,
                name: a.user.name,
                email: a.user.email
            } : null
        }));
    }
    async getDetails(criteria, options={}) {
        options.populate = [
            "content",
            "content.attachments",
            "testcases",
            "defects",
            "user"
        ];
        const comment = await super.findOne(criteria, options);
        if(!comment)
            return comment;
        let arrTestCases = !comment.testcases
            ? []
            : comment.testcases instanceof Array
                ? comment.testcases
                : [ comment.testcases ];
        let arrDefects = !comment.defects
            ? []
            : comment.defects instanceof Array
                ? comment.defects
                : [ comment.defects ];
        arrTestCases = arrTestCases.map(tc => ({
            id: tc.id,
            name: tc.name,
            testPlan: tc.testplan && tc.testplan.id
        }));
        arrDefects = arrDefects.map(d => ({
            id: d.id,
            name: d.name
        }));

        const { testcases, defects, ...others } = comment; // eslint-disable-line no-unused-vars
        const manager = this.getEntityManager();
        const fileRepo = manager.getRepository(File);
        const attachments = await this.getAttachments(comment, fileRepo);
        const user = comment.user ? {
            id: comment.user.id,
            name: comment.user.name,
            email: comment.user.email
        } : null;

        return {
            ...others,
            testCases: arrTestCases,
            defects: arrDefects,
            content: comment.content.value,
            attachments,
            created: dateFormat(comment.created),
            modified: dateFormat(comment.modified),
            user
        };
    }
    async _addDetails(comments, fileRepo) {
        const pAttachments = comments.map(c => this.getAttachments(c, fileRepo));
        const attachments = await Promise.all(pAttachments);
        return comments.map((c, index) => {
            const user = c.user ? {
                id: c.user.id,
                name: c.user.name,
                email: c.user.email
            } : null;
            return {
                id: c.id,
                content: c.content.value,
                attachments: attachments[index],
                created: dateFormat(c.created),
                modified: dateFormat(c.modified),
                user
            };
        });
    }
    async findByTestCase(testCaseId) {
        const comments = await super.find({
            "tc.id": testCaseId
        }, {
            populate: [
                {"testcases": "tc" },
                { "tc.testplan": "testplan" },
                "content",
                "user"
            ],
            orderBy: {
                created: "desc"
            }
        });
        if(!comments)
            return [];
        const manager = this.getEntityManager();
        const fileRepo = manager.getRepository(File);
        return await this._addDetails(comments, fileRepo);
    }
    async findByDefect(defectId) {
        const comments = await super.find({
            "d.id": defectId
        }, {
            populate: [
                { "defects": "d" },
                "content",
                "user"
            ],
            orderBy: {
                created: "desc"
            }
        });
        if(!comments)
            return [];
        const manager = this.getEntityManager();
        const fileRepo = manager.getRepository(File);
        return await this._addDetails(comments, fileRepo);
    }
}

module.exports = CommentRepository;
