const express = require("express");
const multer = require('multer');
const checkAuth = require('../middleware/user-auth');
const router = express.Router();


const shoesController = require('../controllers/shoes.controllers');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

router.get("/:page", shoesController.getAll);
router.post("/add", upload.single('file'), shoesController.add);
// router.get("/:_id",shoesController.getSingleshoes);
// router.put("/:_id", shoesController.updateshoes);
// router.delete("/:_id", shoesController.deleteshoes);


module.exports = router;