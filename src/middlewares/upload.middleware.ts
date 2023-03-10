import multer from 'multer';
const fs = require('fs')

// Define storage configuration for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDirectory = '../upload';
        if (!fs.existsSync(uploadDirectory)) {
          fs.mkdirSync(uploadDirectory);
        }
        cb(null, uploadDirectory);
      },
  
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});


// Create multer instance
export const upload = multer({ storage: storage });
