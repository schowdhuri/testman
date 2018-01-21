"use strict";

class User {
    static setMapping(mapping) {
        mapping.forProperty("id").generatedValue("autoIncrement");
        mapping.field("username", {
            type: "string",
            nullable: false
        });
        mapping.uniqueConstraint("username");
    }
}

module.exports = User;
