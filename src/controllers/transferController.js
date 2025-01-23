const movementService = require('../services/movementService'); // Asegúrate de tener el servicio para manejar los movimientos
const accountService = require('../services/accountService'); // Asegúrate de tener el servicio para manejar las cuentas

// Controlador para realizar la transferencia
async function transferMoney(req, res) {
  const { fromAccount, toAccount, amount } = req.body; // Obtén las cuentas y el monto desde el cuerpo de la solicitud

  if (amount <= 0) {
    return res.status(400).json({ message: 'Amount must be greater than 0' });
  }

  try {
    // Verificar si las cuentas existen
    const fromAccountData = await accountService.getAccountById(fromAccount);
    const toAccountData = await accountService.getAccountById(toAccount);

    if (!fromAccountData || !toAccountData) {
      return res.status(404).json({ message: 'One or both accounts not found' });
    }

    // Verificar si la cuenta de origen tiene suficiente saldo
    if (fromAccountData.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Realizar la transferencia: descontar del saldo de la cuenta de origen
    fromAccountData.balance -= amount;
    toAccountData.balance += amount;

    // Guardar los cambios en las cuentas
    await accountService.updateAccount(fromAccount, fromAccountData);
    await accountService.updateAccount(toAccount, toAccountData);

    // Registrar el movimiento de la transferencia (puedes guardar en una base de datos de movimientos)
    await movementService.createMovement(fromAccount, 'withdrawal', amount, 'Transfer to account ' + toAccount);
    await movementService.createMovement(toAccount, 'deposit', amount, 'Transfer from account ' + fromAccount);

    return res.status(200).json({ message: 'Transfer successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { transferMoney };
