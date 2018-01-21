"use strict";

class RichText {
    static setMapping(mapping) {
        mapping.forProperty("id").primary().increments();
        mapping.field("value", {
            type: "text",
            nullable: false
        });
    }
}

module.exports = RichText;
