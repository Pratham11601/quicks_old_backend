const express = require('express');

const vendorDetailsController = require('../controllers/vendor.controller');

const router = express.Router();
const path = require('path');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let folder;
      switch (file.fieldname) {
        case 'profileImgUrl':
          folder = 'profile_img';
          break;
        case 'documentImage':
          folder = 'documents';
          break;
        case 'licenseImage':
          folder = 'license';
      }
      cb(null, path.join('uploads', folder));
    },
    filename: function (req, file, cb) {
      const originalname = file.originalname; 
      const fileExtension = path.extname(originalname).toLowerCase();
  
      const uniqueSuffix = Date.now()  + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + uniqueSuffix + fileExtension);
    },
  });
  
  const upload = multer({ storage: storage });


router.post('/', upload.fields([
  { name: 'profileImgUrl', maxCount: 1 },
  { name: 'documentImage', maxCount: 1 },
  { name: 'licenseImage', maxCount: 1 },
  
]), vendorDetailsController.saveVendorDetails);

// POST route for saving basic vendor details
router.post('/register', vendorDetailsController.saveBasicVendorDetails);

// Define the route
router.post(
  '/:vid/upload-images',
  upload.fields([
    { name: 'profileImgUrl', maxCount: 1 },
    { name: 'documentImage', maxCount: 1 },
    { name: 'licenseImage', maxCount: 1 }
  ]),
  vendorDetailsController.uploadVendorImages
);

router.get('/user-details/:phone', vendorDetailsController.getUserDetailsByPhone);

router.post('/update-email', vendorDetailsController.updateEmail);

router.post('/resetpassword', vendorDetailsController.resetPassword);

router.post('/login', vendorDetailsController.login);

router.post('/check', vendorDetailsController.checkPhoneNumberExistence);


router.get('/', vendorDetailsController.showAllVendors);

router.patch('/:id', upload.fields([
  { name: 'profileImgUrl', maxCount: 1 },
  { name: 'documentImage', maxCount: 1 },
  { name: 'licenseImage', maxCount: 1 },
]), vendorDetailsController.editVendorDetails);


router.post('/get/:id',vendorDetailsController.getVendorDetailsById );

router.get('/checkProfileCompletion/:id', vendorDetailsController.checkProfileCompletion);




router.get('/checkSubscriptionExpiry/:id', vendorDetailsController.checkSubscriptionExpiry);
router.put('/subscription/:id', vendorDetailsController.updateVendorSubscriptionPlan);


router.post('/buy-subscription', vendorDetailsController.buySubscription);






module.exports = router;