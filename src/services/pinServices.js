// services/movementService.js
const fs = require('fs');
const path = require('path');
const { encryptPin } = require('../utils/pinEncryption');

// Load account data
const accounts = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/accounts.json'), 'utf-8'));

// Get movements by card number
const changePIN = (cardNumber, newPIN) => {
  const account = accounts.find(acc => acc.cardNumber === cardNumber);
  if (!account) return null;

  // TODO Here we can modify the PIN
  const encryptedPin = encryptPin(newPIN);

  return `The PIN for ${cardNumber} has been changed successfully!`
};

module.e
