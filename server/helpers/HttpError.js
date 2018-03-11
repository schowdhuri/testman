class HttpError extends Error {
    constructor(code, message, ...params) {
        super(...params);
        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, HttpError);
        }
        this.code = code;
        this.message = message;
    }
}

module.exports = HttpError;
