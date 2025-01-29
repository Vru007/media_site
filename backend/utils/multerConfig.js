const multer = require('multer');

const storage = multer.memoryStorage(); // Store file in memory before uploading
exports.upload = multer({ storage });


