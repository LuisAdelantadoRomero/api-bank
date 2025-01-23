const express = require('express');
const router = express.Router();

const movementsController = require('../controllers/movementsController');
const retreivalController = require('../controllers/retreivalController');
const depositController = require('../controllers/depositController');
const pinController = require('../controllers/pinController');
const configurationController = require('../controllers/configurationController');

// Check movements
router.get('/movements/:numberCard', movementsController.getMovements);

// Retrieve money
router.post('/retrieve/:numberCard', retreivalController.retrieveMoney);

// Deposit money
router.post('/deposit/:numberCard', depositController.depositMoney);

// Change PIN
router.put('/pin/:numberCard', pinController.changePin);

// Check or modify the configuration of th card
router.get('/configuration/:numberCard', configurationController.getConfiguration);
router.put('/configuration/:numberCard', configurationController.modifyConfiguration);

module.exports = router;
