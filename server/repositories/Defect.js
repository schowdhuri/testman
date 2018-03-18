const { EntityRepository } = require("wetland");

const Comment = require("../models/Comment");
const File = require("../models/File");

const dateFormat = require("../../common/utils/dateFormat");


class DefectRepository extends EntityRepository {
    async getComments(id, commentRepo) {
        const comments = await commentRepo
            .find({
                "c.defects_id": id
            }, {
                alias: "c",
                populate: [ "content" ]
            });
        if(!comments)
            return [];
        return comments
            .map(c => ({
                id: c.id,
                content: c.content && c.content.value,
                created: dateFormat(c.created),
                modified :dateFormat(c.modified)
            }))
            .filter(c => c.content);
    }
    async getAttachments(idArr, fileRepo) {
        const pArr = idArr.map(id => fileRepo.getDetails(id));
        const attachments = await Promise.all(pArr);
        return attachments;
    }
    async getDetails(criteria, options={}) {
        options.populate = [
            "description",
            "description.attachments",
            "testcases",
            "testruns",
            "testruns.testcase",
            "testcases.testplan",
            "assignee"
        ];
        const defect = await super.findOne(criteria, options);
        if(!defect)
            return defect;
        const testCases = defect.testcases.map(tc => ({
            id: tc.id,
            name: tc.name,
            testPlan: tc.testplan && tc.testplan.id
        }));
        const testRuns = defect.testruns.map(tr => ({
            id: tr.id,
            status: tr.status,
            testCase: {
                id: tr.testcase.id
            }
        }));
        const { testcases, testruns, ...others } = defect;
        const manager = this.getEntityManager();
        const commentRepo = manager.getRepository(Comment);
        const fileRepo = manager.getRepository(File);
        const [ attachments, comments ] = await Promise.all([
            this.getAttachments(defect.description.attachments.map(a => a.id), fileRepo),
            this.getComments(defect.id, commentRepo)
        ]);
        return {
            ...others,
            testCases,
            testRuns,
            description: {
                ...defect.description,
                attachments,
                created: dateFormat(defect.description.created),
                modified: dateFormat(defect.description.modified)
            },
            comments,
            created: dateFormat(defect.created),
            modified: dateFormat(defect.modified)
        };
    }
    async findAll() {
        const qb = this.getQueryBuilder("d");
        const manager = this.getEntityManager();

        let defects = await qb
            .leftJoin("d.description", "desc")
            .leftJoin("d.testcases", "tc")
            .leftJoin("d.assignee", "assignee")
            .select("d", "tc", "desc", "assignee")
            .getQuery()
            .getResult();

        if(!defects)
            return [];


        defects = defects.map(defect => {
            const { testcases, ...others } = defect;
            const d = {
                ...others,
                description: defect.description.value,
                testCases: defect.testcases
            };
            return d;
        });

        const commentRepo = manager.getRepository(Comment);

        const pArrDefWithComments = defects.map(defect =>
            this.getComments(defect.id, commentRepo)
                .then(comments => ({
                    ...defect,
                    comments
                }))
        );

        defects = await Promise.all(pArrDefWithComments);
        return defects;
    }
}

module.exports = DefectRepository;
