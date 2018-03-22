const moment = require("moment");

const format = timestamp => moment(timestamp ? new Date(timestamp) : new Date()).format("DD MMM, YYYY HH:mm");

module.exports = format;
