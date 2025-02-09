const express = require('express');
const router = express.Router();
const subPackagesController = require('../controllers/sub_controller');

// Route to get all sub-packages
router.get('/', subPackagesController.getAllSubPackages);

// Route to add a new sub-package
router.post('/', subPackagesController.addSubPackage);


router.put('/edit/:id', subPackagesController.editSubPackage);

module.exports = router;
