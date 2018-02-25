const moment = require("moment");

const format = timestamp => moment(new Date(timestamp)).format("DD MMM, YYYY HH:mm");

module.exports = format;