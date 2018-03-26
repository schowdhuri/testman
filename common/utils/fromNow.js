const moment = require("moment");

const fromNow = formattedDate => moment(formattedDate, "DD MMM, YYYY HH:mm").fromNow();

module.exports = fromNow;
