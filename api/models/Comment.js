"use strict";

class Comment {
    static setMapping(mapping) {
        mapping.forProperty("id").primary().increments();
        mapping.oneToOne("content", { targetEntity: "RichText", inversedBy: "comnents" });
        mapping.manyToOne("testcases", { targetEntity: "TestCase", inversedBy: "testcases" });
        mapping.manyToOne("defects", { targetEntity: "Defect", inversedBy: "defects" });
    }
}

module.exports = Comment;
