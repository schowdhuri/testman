"use strict";

class RichText {
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
        mapping.field("value", {
            type: "text",
            nullable: false
        });
    }

    beforeCreate() {
        this.created = new Date();
        this.modified = this.created;
    }

    beforeUpdate(values) {
        values.modified = new Date();
    }
}

module.exports = RichText;
