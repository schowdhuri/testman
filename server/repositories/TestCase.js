const { EntityRepository } = require("wetland");

const Comment = require("../models/Comment");
const File = require("../models/File");

const dateFormat = require("../../common/utils/dateFormat");


class TestCaseRepository extends EntityRepository {
    async getComments(id, commentRepo) {
        const comments = await commentRepo
            .find({
                "c.testcases_id": id
            }, {
                alias: "c",
                populate: [ "content", "user" ]
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
    async getCommentsMinimal(id, commentRepo) {
        const comments = await commentRepo
            .find({ "testcases_id": id });
        if(!comments)
            return [];
        return comments.map(c => c.id)
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
            "testplan",
            "defects",
            "user"
        ];
        const testCase = await this.findOne(criteria, options);
        if(!testCase)
            return testCase;
        const _defects = testCase.defects.map(d => ({
            id: d.id,
            name: d.name,
            status: d.status
        }));
        const { defects, ...others } = testCase; // eslint-disable-line no-unused-vars
        const manager = this.getEntityManager();
        const commentRepo = manager.getRepository(Comment);
        const fileRepo = manager.getRepository(File);
        const [ attachments, comments ] = await Promise.all([
            this.getAttachments(testCase.description.attachments.map(a => a.id), fileRepo),
            commentRepo.findByTestCase(testCase.id)
        ]);
        return {
            ...others,
            defects: _defects,
            description: {
                ...testCase.description,
                attachments,
                created: dateFormat(testCase.description.created),
                modified: dateFormat(testCase.description.modified)
            },
            comments,
            created: dateFormat(testCase.created),
            modified: dateFormat(testCase.modified)
        };
    }
    async findByTestPlan(testPlanId) {
        const qb = this.getQueryBuilder("tc");

        let testCases = await qb
            .leftJoin("tc.testplan", "tp")
            .leftJoin("tc.defects", "def")
            .leftJoin("tc.user", "user")
            .select("tc", "tp.id", "def", "user")
            .where({ "tp.id": testPlanId })
            .getQuery()
            .getResult();

        if(!testCases)
            return [];

        testCases = testCases.map(testCase => {
            const { comments, testplan, ...others } = testCase; // eslint-disable-line no-unused-vars
            const t = {
                ...others,
                testplan: testPlanId,
                defects: testCase.defects.map(d => ({
                    id: d.id,
                    status: d.status
                })),
                user: testCase.user ? {
                    id: testCase.user.id,
                    name: testCase.user.name,
                    email: testCase.user.email
                } : null,
                created: dateFormat(testCase.created),
                modified: dateFormat(testCase.modified)
            };
            return t;
        });

        const manager = this.getEntityManager();
        const commentRepo = manager.getRepository(Comment);
        const pArrTCWithComments = testCases.map(testCase =>
            this.getCommentsMinimal(testCase.id, commentRepo)
                .then(comments => ({
                    ...testCase,
                    comments
                }))
        );
        testCases = await Promise.all(pArrTCWithComments);

        return testCases;
    }
}

module.exports = TestCaseRepository;
