"use strict";

const DefectRepository = require("../repositories/Defect");

const STATES = require("../../common/constants/DefectStates");

class Defect {
    static setMapping(mapping) {
        mapping.entity({ repository: DefectRepository });

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
        mapping.oneToOne("assignee", { targetEntity: "User" });
        mapping.field("name", {
            type: "string",
            nullable: false
        });
        mapping.oneToOne("description", { targetEntity: "RichText", inversedBy: "defects" });
        mapping.field("status", {
            type: "enumeration",
            nullable: false,
            enumeration: STATES
        });
        mapping.manyToMany("testcases", { targetEntity: "TestCase", inversedBy: "defects" });
        mapping.manyToMany("testruns", { targetEntity: "TestRun", mappedBy: "defects" });
    }

    beforeCreate() {
        const datetime = new Date();
        this.modified = datetime;
        this.created = datetime;
        this.status = STATES[0];
    }

    beforeUpdate(values) {
        values.modified = new Date();
    }
}

module.exports = Defect;
