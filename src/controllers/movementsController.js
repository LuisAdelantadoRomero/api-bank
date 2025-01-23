const movementService = require('../services/movementService');

const getMovements = (req, res) => {
    const { cardNumber } = req.params;
    const movements = movementService.getMovements(cardNumber);
    if (!movements) {
        return res.status(404).json({ error: 'Cuenta no encontrada' });
    }
    res.json(movements);
};

module.exports = { getMovements };
