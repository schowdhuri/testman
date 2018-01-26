"use strict";

class Defect {
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
        mapping.field("name", {
            type: "string",
            nullable: false
        });
        mapping.oneToOne("description", { targetEntity: "RichText", inversedBy: "defects" });
        mapping.field("status", {
            type: "enumeration",
            nullable: false,
            enumeration: ["Open", "WIP", "Closed"]
        });
        mapping.oneToMany("comments", { targetEntity: "Comment", mappedBy: "comments" });
        mapping.manyToMany("testcases", { targetEntity: "TestCase", inversedBy: "defects" })
    }

    beforeCreate() {
        const datetime = new Date();
        this.modified = datetime;
        this.created = datetime;
        this.status = "Open";
    }

    beforeUpdate(values) {
        values.modified = new Date();
    }
}

module.exports = Defect;
