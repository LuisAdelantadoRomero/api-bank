const movementService = require('../services/movementService'); // Asegúrate de tener el servicio para manejar los movimientos
const accountService = require('../services/accountService'); // Asegúrate de tener el servicio para manejar las cuentas

// Controller for the transfer
async function transferMoney(req, res) {
  const { fromAccount, toAccount, amount } = req.body; // Obtén las cuentas y el monto desde el cuerpo de la solicitud

  if (amount <= 0) {
    return res.status(400).json({ message: 'Amount must be greater than 0' });
  }

  try {
    // Verify if the accounts exists
    const fromAccountData = await accountService.getAccountById(fromAccount);
    const toAccountData = await accountService.getAccountById(toAccount);

    if (!fromAccountData || !toAccountData) {
      return res.status(404).json({ message: 'Una o varias cuentas no han sido encontradas' });
    }

    // We should verify if the account has enough money
    if (fromAccountData.balance < amount) {
      return res.status(400).json({ message: 'Balance insuficiente' });
    }

    // Transfer
    fromAccountData.balance -= amount;
    toAccountData.balance += amount;

    // Updating account
    await accountService.updateAccount(fromAccount, fromAccountData);
    await accountService.updateAccount(toAccount, toAccountData);

    // Store the movement itself
    await movementService.createMovement(fromAccount, 'withdrawal', amount, 'Transferido a la cuenta ' + toAccount);
    await movementService.createMovement(toAccount, 'deposit', amount, 'Transferido de la cuenta ' + fromAccount);

    return res.status(200).json({ message: 'Transfer successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { transferMoney };
