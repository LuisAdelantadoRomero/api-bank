// services/movementService.js
const fs = require('fs');
const path = require('path');

// Cargar los datos de las cuentas
const accounts = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/accounts.json'), 'utf-8'));

// Obtener movimientos por número de tarjeta
const changePIN = (cardNumber, newPIN) => {
  const account = accounts.find(acc => acc.cardNumber === cardNumber);
  if (!account) return null;

  // TODO Here we can modify the PIN

  return `The PIN for ${cardNumber} has been changed successfully!`
};

module.exports = { changePIN };