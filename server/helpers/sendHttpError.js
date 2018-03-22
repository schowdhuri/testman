/* eslint-disable no-console */

const HttpError = require("./HttpError");

const sendHTTPError = (err, res) => {
    if(!err)
        return;
    if(err instanceof HttpError) {
        const { code, message } = err;
        res.status(code).send(message);
    } else {
        if(err instanceof Error) {
            console.error(err.stack);
        } else {
            console.error(err);
        }
        res.status(500).send(err);
    }
};

module.exports = sendHTTPError;
