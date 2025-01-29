const multer = require('multer');

const storage = multer.memoryStorage(); // Store file in memory before uploading
const upload = multer({ storage });

module.exports = upload;
