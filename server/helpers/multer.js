const path = require("path");
const multer  = require("multer");
const moment = require("moment");

const { UPLOAD_DIR } = require("../constants/paths");

const storage = multer.diskStorage({
    destination: UPLOAD_DIR,
    filename: (req, file, cb) => {
        console.log("file: ", file)
        const timestamp = moment().format("YYYY-MM-DD-HH-mm-ss");
        cb(null, `${file.fieldname}_${timestamp}_${file.originalname}`);
    }
 });

const memStorage = multer.memoryStorage();

const createUploader = (temp=false) => {
    if(temp)
        return multer({ storage: memStorage });
    return multer({ storage });
}

module.exports = createUploader;
