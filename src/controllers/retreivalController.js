const retrievalServices = require('../services/retrievalServices');

const retrievalMoney = (req, res) => {
    const { numberCard, ammount } = req.params;
    const retrieval = retrievalServices.retrievalMoney(numberCard, ammount);
    if (!retrieval) {
        return res.status(404).json({ error: 'Cuenta no encontrada' });
    }
    res.json(retrieval);
};

module.exports = { retrievalMoney };
