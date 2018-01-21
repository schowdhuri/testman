const path = require("path");

module.exports = {
    entityPath: path.resolve(__dirname, "api", "models"),
    stores: {
        defaultStore: {
            client: "sqlite",
            connection: {
                filename: path.resolve(__dirname, ".db", "testman.db")
            },
    		useNullAsDefault: true
        }
    }
};
