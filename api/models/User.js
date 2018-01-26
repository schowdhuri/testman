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
        mapping.forProperty("id").generatedValue("autoIncrement");
        mapping.field("username", {
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
