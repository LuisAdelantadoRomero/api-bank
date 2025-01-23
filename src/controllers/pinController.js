const pinService = require('../services/pinServices');

const changePIN = (req, res) => {
    const { numberCard, newPIN } = req.params;
    const pin = pinService.changePIN(numberCard, newPIN);
    if (!pin) {
        return res.status(404).json({ error: 'Cuenta no encontrada' });
    }
    res.json(deposit);
};

module.exports = { changePIN };
