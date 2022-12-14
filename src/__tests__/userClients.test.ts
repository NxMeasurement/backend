import dotenv from 'dotenv';
dotenv.config();
import { MongoMemoryServer } from 'mongodb-memory-server';
import supertest from 'supertest';
import mongoose from 'mongoose';
import { signJwt } from '../utils/jwt.utils';
import { app } from './server';

const sessionId = new mongoose.Types.ObjectId().toString();

export const userData = {
  name: 'Jan',
  lastName: 'Kowalski',
  email: 'jan.kowalski@gmail.com',
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};

const clientInput = {
  name: 'Jan',
  lastName: 'Kowalski',
  dateOfBirth: new Date(),
  gender: 'male',
  physiologicalState: 'lack',
  pal: 1.4,
};

const clientPayload = {
  ...clientInput,
  specificAims: expect.any(Array),
  dateOfBirth: expect.any(String),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  _id: expect.any(String),
  __v: expect.any(Number),
};

describe('user clients', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('get client route', () => {
    let clientId: string;

    const accessToken = signJwt(
      { ...userData, sessionId },
      'accessTokenPrivateKey',
      { expiresIn: '15m' }
    );

    describe('create client', () => {
      it('should return a 200', async () => {
        const { statusCode, body } = await supertest(app)
          .post('/api/clients')
          .set('Authorization', `Bearer ${accessToken}`)
          .send(clientInput);

        expect(body).toEqual(clientPayload);

        clientId = body._id;

        expect(statusCode).toBe(200);
      });
    });

    describe('given the user is not logged in', () => {
      it('should return a 403', async () => {
        const { statusCode } = await supertest(app).get('/api/clients');
        expect(statusCode).toBe(403);
      });
    });

    describe('get user clients', () => {
      it('should return a 200 and the user clients', async () => {
        const { body, statusCode } = await supertest(app)
          .get('/api/clients')
          .set('Authorization', `Bearer ${accessToken}`);

        expect(statusCode).toBe(200);
        expect(body).toEqual([clientPayload]);
      });
    });
  });
});
