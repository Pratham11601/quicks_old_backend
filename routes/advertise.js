// C:\Users\ADMIN\Desktop\node TwentyFour\routes\advertise.js

const express = require('express');
const advertiseController = require('../controllers/advertise.controller');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join('uploads', 'advertise'));
    },
    filename: function (req, file, cb) {
        const originalname = file.originalname;
        const fileExtension = path.extname(originalname).toLowerCase();
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9);
        cb(null, 'advertise' + uniqueSuffix + fileExtension);
    },
});


const router = express.Router();
const upload = multer({ storage: storage });

router.post('/', upload.single('image'), advertiseController.saveAdvertisement);
router.get('/', advertiseController.getAdvertisements);


module.exports = router;
