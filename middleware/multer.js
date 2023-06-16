const multer = require('multer');
const path = require('path');

// Multer upload configuration for file uploads
const storage = multer.diskStorage({
  destination: './public/uploads/Blogs',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
