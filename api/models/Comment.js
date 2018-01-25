"use strict";

class Comment {
    static setMapping(mapping) {
        mapping.field("created", {
            type: "datetime",
            nullable: true
        });
        mapping.field("modified", {
            type: "datetime",
            nullable: true
        });
        mapping.forProperty("id").primary().increments();
        mapping.oneToOne("content", { targetEntity: "RichText", inversedBy: "comnents" });
        mapping.manyToOne("testcases", { targetEntity: "TestCase", inversedBy: "testcases" });
        mapping.manyToOne("defects", { targetEntity: "Defect", inversedBy: "defects" });
    }

    beforeCreate() {
        const datetime = new Date();
        this.created = datetime;
        this.modified = datetime;
    }

    beforeUpdate(values) {
        values.modified = new Date();
    }
}

module.exports = Comment;
