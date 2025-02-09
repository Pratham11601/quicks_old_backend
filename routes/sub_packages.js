const express = require('express');
const router = express.Router();
const subPackagesController = require('../controllers/sub_controller');

// Route to get all sub-packages
router.get('/', subPackagesController.getAllSubPackages);

// Route to add a new sub-package
router.post('/', subPackagesController.addSubPackage);

module.exports = router;
