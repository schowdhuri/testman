"use strict";

class TestCase {
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
        mapping.oneToOne("user", { targetEntity: "User" });
        mapping.field("name", {
            type: "string",
            nullable: false
        });
        mapping.oneToOne("description", { targetEntity: "RichText", inversedBy: "testcases" });
        mapping.field("status", {
            type: "enumeration",
            nullable: false,
            enumeration: ["New", "Pass", "Fail"]
        });
        mapping.manyToOne("testplan", { targetEntity: "TestPlan", inversedBy: "testplan" });
        mapping.oneToMany("comments", { targetEntity: "Comment", mappedBy: "testcases" });
        mapping.manyToMany("defects", { targetEntity: "Defect", mappedBy: "testcases" });
    }

    beforeCreate() {
        const datetime = new Date();
        this.modified = datetime;
        this.created = datetime;
        this.status = "New";
    }

    beforeUpdate(values) {
        values.modified = new Date();
    }
}

module.exports = TestCase;
