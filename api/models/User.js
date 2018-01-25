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
        this.created = new Date();
        this.modified = this.created;
    }

    beforeUpdate(values) {
        values.modified = new Date();
    }
}

module.exports = User;
