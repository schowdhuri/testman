"use strict";

class User {
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
        mapping.field("authid", {
            type: "string",
            nullable: false
        });
        mapping.field("username", {
            type: "string",
            nullable: false
        });
        mapping.field("email", {
            type: "string",
            nullable: false
        });
        mapping.field("name", {
            type: "string",
            nullable: false
        });
        mapping.uniqueConstraint("username");
    }

    beforeCreate() {
        const datetime = new Date();
        this.modified = datetime;
        this.created = datetime;
    }

    beforeUpdate(values) {
        values.modified = new Date();
    }
}

module.exports = User;
