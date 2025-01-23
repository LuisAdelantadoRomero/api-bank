const depositService = require('../services/depositService');

const depositMoney = (req, res) => {
    const { numberCard, ammount } = req.params;
    const deposit = depositService.depositMoney(numberCard, ammount);
    if (!deposit) {
        return res.status(404).json({ error: 'Cuenta no encontrada' });
    }
    res.json(deposit);
};

module.exports = { depositMoney };
