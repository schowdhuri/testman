const path = require("path");

module.exports.UPLOAD_DIR       = path.resolve(process.env.UPLOAD_PATH || "/tmp");
module.exports.OAUTH_CB_ROOT    = process.env.OAUTH_CB_ROOT || "http://localhost:3200";
module.exports.UPLOAD_DIR_ALIAS = "/media";
module.exports.STATIC_DIR       = path.join(__dirname, "..", "..", "client", "dist");
module.exports.STATIC_DIR_ALIAS = "/static";
