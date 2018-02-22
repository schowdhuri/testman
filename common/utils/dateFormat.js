const moment = require("moment");

const format = timestamp => moment(timestamp).format("DD MMM, YYYY HH:mm");

module.exports = format;