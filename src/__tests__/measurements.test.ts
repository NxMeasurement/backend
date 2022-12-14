import dotenv from 'dotenv';
dotenv.config();
import { MongoMemoryServer } from 'mongodb-memory-server';
import supertest from 'supertest';
import mongoose from 'mongoose';
import { signJwt } from '../utils/jwt.utils';
import { app } from './server';

const sessionId = new mongoose.Types.ObjectId().toString();
const clientId = new mongoose.Types.ObjectId().toString();

export const userData = {
  name: 'Jan',
  lastName: 'Kowalski',
  email: 'jan.kowalski@gmail.com',
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};

const measurementInput = {
  client: clientId,
  name: 'Pomiar 1',
  date: new Date(),
  weight: 77,
  height: 178,
  bmi: 22,
  ppmMifflin: 1877,
  ppmHarris: 1898,
  cpm: 2600,
};

const measurementPayload = {
  ...measurementInput,
  date: expect.any(String),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  _id: expect.any(String),
  __v: expect.any(Number),
};

describe('client measurements', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('get measurement route', () => {
    let measurementId: string;

    const accessToken = signJwt(
      { ...userData, sessionId },
      'accessTokenPrivateKey',
      { expiresIn: '15m' }
    );

    describe('create measurement', () => {
      it('should return a 200', async () => {
        const { statusCode, body } = await supertest(app)
          .post('/api/measurements')
          .set('Authorization', `Bearer ${accessToken}`)
          .send(measurementInput);

        expect(body).toEqual(measurementPayload);

        measurementId = body._id;

        expect(statusCode).toBe(200);
      });
    });

    describe('given the user is not logged in', () => {
      it('should return a 403', async () => {
        const { statusCode } = await supertest(app).get('/api/measurements');
        expect(statusCode).toBe(403);
      });
    });

    describe('get user measurements', () => {
      it('should return a 200 and the measurements', async () => {
        const { body, statusCode } = await supertest(app)
          .get('/api/measurements')
          .set('Authorization', `Bearer ${accessToken}`);

        expect(statusCode).toBe(200);
        expect(body).toEqual([measurementPayload]);
      });
    });
  });
});
