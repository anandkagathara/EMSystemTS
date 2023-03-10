import multer from 'multer';
const fs = require('fs')


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


export const upload = multer({ storage: storage });
