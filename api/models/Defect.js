"use strict";

class Defect {
    static setMapping(mapping) {
        mapping.forProperty("id").primary().increments();
        mapping.field("name", {
            type: "string",
            nullable: false
        });
        mapping.oneToOne("description", { targetEntity: "RichText", inversedBy: "defects" });
        mapping.field("status", {
            type: "enumeration",
            nullable: false,
            defaultTo: "Open",
            enumeration: ["Open", "WIP", "Closed"]
        });
        mapping.oneToMany("comments", { targetEntity: "Comment", mappedBy: "comments" });
        mapping.manyToMany("testcases", { targetEntity: "TestCase", inversedBy: "defects" })
    }
}

module.exports = Defect;
