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
        mapping.oneToMany("attachments", { targetEntity: "File", mappedBy: "richtext" });
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

module.exports = RichText;
