const multer = require('multer');
const fs = require('fs');

const storageRecipe = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = 'public/images/recipe';
    fs.mkdirSync(path, { recursive: true });

    cb(null, path)
  },
  filename: function (req, file, cb) {
    const uniqueTime = new Date().toISOString().replace(/:/g, '-');
    const fileName = `${uniqueTime}-${file.originalname}`;

    cb(null,fileName);
  }
});

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// }

const uploadRecipe = multer({ storage: storageRecipe });

module.exports = uploadRecipe;