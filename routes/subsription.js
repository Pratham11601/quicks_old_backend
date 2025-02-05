const express = require('express');
const subscriptionController = require('../controllers/subscriptions_controller');
const router = express.Router();

router.get('/', subscriptionController.getAll);

module.exports = router;