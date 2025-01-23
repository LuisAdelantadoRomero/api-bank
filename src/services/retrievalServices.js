// services/movementService.js
const fs = require('fs');
const path = require('path');

// Cargar los datos de las cuentas
const accounts = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/accounts.json'), 'utf-8'));

// Obtener movimientos por número de tarjeta
const retrievalMoney = (cardNumber, ammount) => {
  const account = accounts.find(acc => acc.cardNumber === cardNumber);
  if (!account) return null;

  //TODO We can add here later an operation to retrieve the money and modify the ammount on the data

  return `For cardNumber ${cardNumber} retrieved the ammount ${ammount}`
};

module.exports = { retrievalMoney };
