"use strict";

const FileRepository = require("../repositories/File");

class File {
    static setMapping(mapping) {
        mapping.entity({ repository: FileRepository });

        mapping.field("created", {
            type: "datetime",
            nullable: true
        });
        mapping.field("modified", {
            type: "datetime",
            nullable: true
        });
        mapping.forProperty("id").primary().increments();
        mapping.oneToOne("user", { targetEntity: "User" });
        mapping.field("name", {
            type: "string",
            nullable: false
        });
        mapping.field("description", {
            type: "string",
            nullable: true
        });
        mapping.field("path", {
            type: "string",
            nullable: false
        });
        mapping.manyToOne("richtext", { targetEntity: "Comment", inversedBy: "richtext" });
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

module.exports = File;
