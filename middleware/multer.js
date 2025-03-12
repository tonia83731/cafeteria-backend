const multer = require("multer");
// const upload = multer({ dest: "temp/" });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = upload;
