"use strict";

class TestCase {
    static setMapping(mapping) {
        mapping.forProperty("id").primary().increments();
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
        mapping.oneToMany("comments", { targetEntity: "Comment", mappedBy: "comments" });
        mapping.manyToMany("defects", { targetEntity: "Defect", mappedBy: "testcases" });
    }
}

module.exports = TestCase;
