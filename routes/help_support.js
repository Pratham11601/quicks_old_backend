// help_support.js

const express = require('express');
const router = express.Router();

const helpSupportController = require('../controllers/help_support.controller');

router.get('/:id', helpSupportController.index);

router.post('/', helpSupportController.save);

router.get('/vendorcategories', helpSupportController.getDistinctVendorCategoryValues);

router.get('/', helpSupportController.getAll);


module.exports = router;
