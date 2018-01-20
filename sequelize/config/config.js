const path = require("path");

const DB_FILE = "testman.db";
const dbPath = path.resolve(__dirname, "..", "..", ".db", DB_FILE);

module.exports = {
  "development":  {
    "storage": dbPath,
    "dialect": "sqlite"
  }
}
