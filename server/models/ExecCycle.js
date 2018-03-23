"use strict";

const ExecCycleRepository = require("../repositories/ExecCycle");

class ExecCycle {
    static setMapping(mapping) {
        mapping.entity({ repository: ExecCycleRepository });
        mapping.field("created", {
            type: "datetime",
            nullable: true
        });
        mapping.field("modified", {
            type: "datetime",
            nullable: true
        });
        mapping.forProperty("id").primary().increments();
        mapping.field("name", {
            type: "string",
            nullable: false
        });
        mapping.field("startDate", {
            type: "datetime",
            nullable: true
        });
        mapping.field("endDate", {
            type: "datetime",
            nullable: true
        });
        mapping.field("status", {
            type: "enumeration",
            nullable: false,
            enumeration: ["New", "In Progress", "Completed"]
        });
        mapping.oneToMany("testruns", { targetEntity: "TestRun", mappedBy: "execcycle" });
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

module.exports = ExecCycle;
