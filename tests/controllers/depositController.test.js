const retrievalServices = require('../../src/services/retrievalServices');

it('should withdraw money from the account successfully', async () => {
    const cardNumber = '1234-5678-9876-5432';
    const amount = 500;
    const updatedAccount = { balance: 4500 }; // Simulamos la cuenta actualizada

    // Simulamos que el servicio de cuentas realice el retiro
    retrievalServices.retrievalMoney.mockResolvedValue(updatedAccount);

    const response = await request(app).post(`/retrieve/${cardNumber}`).send({ amount });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Successfully retreived ${amount} from account.`);
    expect(accountService.withdraw).toHaveBeenCalledWith(cardNumber, amount);
  });