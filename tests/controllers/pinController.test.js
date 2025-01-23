const request = require('supertest');
const express = require('express');
const pinRoutes = require('../routes/pinRoutes');  // Ruta de tus endpoints
const PinEncryption = require('../services/pinEncryption'); // Servicio de cifrado

const app = express();
app.use(express.json());
app.use('/api', pinRoutes);

// Mock de PinEncryption
jest.mock('../services/pinEncryption');

describe('PIN Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should change the PIN successfully', async () => {
    // Datos simulados
    const cardNumber = '1234-5678-9876-5432';
    const newPin = '1234';
    const hashedPin = 'hashed1234'; // Este sería el PIN cifrado

    // Simulamos que el servicio de cifrado devuelva el PIN cifrado
    PinEncryption.encryptPin.mockResolvedValue(hashedPin);

    // Enviar la solicitud PUT para cambiar el PIN
    const response = await request(app).put(`/api/pin/${cardNumber}`).send({ newPin });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('PIN successfully updated.');
    expect(PinEncryption.encryptPin).toHaveBeenCalledWith(newPin);
  });

  it('should return an error when changing the PIN fails', async () => {
    // Simulamos un error al cifrar el PIN
    PinEncryption.encryptPin.mockRejectedValue(new Error('Error encrypting the PIN'));

    const cardNumber = '1234-5678-9876-5432';
    const newPin = '1234';

    const response = await request(app).put(`/api/pin/${cardNumber}`).send({ newPin });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Error updating the PIN.');
  });

  it('should verify the PIN successfully', async () => {
    const cardNumber = '1234-5678-9876-5432';
    const inputPin = '1234';
    const storedPin = 'hashed1234';

    // Simulamos que el PIN ingresado sea correcto
    PinEncryption.verifyPin.mockResolvedValue(true);

    const response = await request(app).post(`changePIN/${cardNumber}`).send({ inputPin });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Access granted.');
    expect(PinEncryption.verifyPin).toHaveBeenCalledWith(inputPin, storedPin);
  });

  it('should return an error when verifying the PIN fails', async () => {
    const cardNumber = '1234-5678-9876-5432';
    const inputPin = '1234';
    const storedPin = 'hashed1234';

    // Simulamos que el PIN ingresado es incorrecto
    PinEncryption.verifyPin.mockResolvedValue(false);

    const response = await request(app).post(`/api/verify-pin/${cardNumber}`).send({ inputPin });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Incorrect PIN.');
  });

  it('should return an error when verifying the PIN fails with an exception', async () => {
    const cardNumber = '1234-5678-9876-5432';
    const inputPin = '1234';
    const storedPin = 'hashed1234';

    // Simulamos que ocurre un error en la verificación
    PinEncryption.verifyPin.mockRejectedValue(new Error('Error verifying the PIN'));

    const response = await request(app).post(`/api/verify-pin/${cardNumber}`).send({ inputPin });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Error verifying the PIN');
  });
});
