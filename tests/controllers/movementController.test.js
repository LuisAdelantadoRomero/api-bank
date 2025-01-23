// tests/movementController.test.js
const request = require('supertest');
const app = require('../../src/app');  // Asumiendo que tienes un archivo 'app.js' donde exportas la app de Express

jest.mock('../../src/services/movementService.js', () => ({
    getMovementsByCardNumber: jest.fn(),
})); // Mockear el servicio de movimientos

const movementService = require('../../src/services/movementService.js');

describe('GET /api/movements/:cardNumber', () => {
  it('should return the movements of the specified card', async () => {
    // Datos simulados de la cuenta
    const cardNumber = '1234-5678-9876-5432';
    const mockedMovements = [
      {
        date: '2025-01-01',
        type: 'deposit',
        amount: 1000,
        description: 'Initial deposit'
      },
      {
        date: '2025-01-15',
        type: 'withdrawal',
        amount: 200,
        description: 'Cash withdrawal'
      }
    ];

    // We are simulating the bahavior
    movementService.getMovementsByCardNumber.mockResolvedValue(mockedMovements);

    // GET Request
    const response = await request(app).get(`/api/movements/${cardNumber}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockedMovements);
    expect(movementService.getMovementsByCardNumber).toHaveBeenCalledWith(cardNumber);
  });
});
