// Este archivo maneja los movimientos de las cuentas. Deberías usar una base de datos real.
const movements = [];

async function createMovement(accountId, type, amount, description) {
  movements.push({
    accountId,
    type,
    amount,
    description,
    date: new Date().toISOString(),
  });
}

module.exports = { createMovement };
