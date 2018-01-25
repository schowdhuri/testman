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
            // defaultTo: "Open",
            enumeration: ["Open", "WIP", "Closed"]
        });
        mapping.oneToMany("comments", { targetEntity: "Comment", mappedBy: "comments" });
        mapping.manyToMany("testcases", { targetEntity: "TestCase", inversedBy: "defects" })
    }

    beforeCreate() {
        this.created = new Date();
        this.modified = this.created;
        this.status = "Open";
    }

    beforeUpdate(values) {
        values.modified = new Date();
    }
}

module.exports = Defect;
