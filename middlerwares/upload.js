const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

module.exports.upload = multer({ storage: fileStorageEngine, inMemory: true });
