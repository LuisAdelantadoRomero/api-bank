// services/movementService.js
const fs = require('fs');
const path = require('path');

// Load the current data for the accounts
const accounts = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/accounts.json'), 'utf-8'));

// Add an ammount to the account of the card
const depositMoney = (cardNumber, ammount) => {
  const account = accounts.find(acc => acc.cardNumber === cardNumber);
  if (!account) return null;

  //TODO We can add here later an operation to deposit the money and modify the ammount on the data

  return `For cardNumber ${cardNumber} deposited the ammount ${ammount}`
};

module.exports = { depositMoney };
