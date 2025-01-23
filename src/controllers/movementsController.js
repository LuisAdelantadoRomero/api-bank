const movementService = require('../services/movementService');

const getMovements = (req, res) => {
    const { numberCard } = req.params;
    const movements = movementService.getMovementsByCardNumber(numberCard);
    if (!movements) {
        return res.status(404).json({ error: 'Cuenta no encontrada' });
    }
    res.json(movements);
};

module.exports = { getMovements };
