const path = require("path");

module.exports.UPLOAD_DIR       = path.resolve(process.env.UPLOAD_PATH || "/tmp");
module.exports.UPLOAD_DIR_ALIAS = "/media";
module.exports.STATIC_DIR       = path.join(__dirname, "..", "..", "client", "dist");
module.exports.STATIC_DIR_ALIAS = "/static";
