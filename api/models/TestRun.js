"use strict";

class TestRun {
    static setMapping(mapping) {
        mapping.field("created", {
            type: "datetime",
            nullable: true
        });
        mapping.field("modified", {
            type: "datetime",
            nullable: true
        });
        mapping.field("runDate", {
            type: "datetime",
            nullable: true
        });
        mapping.forProperty("id").primary().increments();
        mapping.field("status", {
            type: "enumeration",
            nullable: false,
            enumeration: ["New", "Pass", "Fail"]
        });
        mapping.manyToOne("execcycle", { targetEntity: "ExecCycle", inversedBy: "testruns" });
        mapping.oneToOne("testcase", { targetEntity: "TestCase" });
        mapping.oneToMany("comments", { targetEntity: "Comment", mappedBy: "testrun" });
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

module.exports = TestRun;
