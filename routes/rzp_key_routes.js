const express = require('express');
const router = express.Router();
const rzpKeyController = require('../controllers/rzp_key_controller');

// Route to get all Razorpay keys
router.get('/', rzpKeyController.getAllRzpKeys);

// Route to get a Razorpay key by ID
router.get('/:id', rzpKeyController.getRzpKeyById);

module.exports = router;
