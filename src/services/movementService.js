// services/movementService.js
const fs = require('fs');
const path = require('path');

// Cargar los datos de las cuentas
const accounts = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/accounts.json'), 'utf-8'));

// Obtener movimientos por número de tarjeta
const getMovementsByCardNumber = (cardNumber) => {
  const account = accounts.find(acc => acc.cardNumber === cardNumber);
  if (!account) return null;

  return account.accounts.reduce((acc, currentAccount) => acc.concat(currentAccount.transactions), []);
};

module.exports = { getMovementsByCardNumber };
