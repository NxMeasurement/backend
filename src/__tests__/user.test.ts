import dotenv from 'dotenv';
dotenv.config();
import { MongoMemoryServer } from 'mongodb-memory-server';
import supertest from 'supertest';
import mongoose from 'mongoose';
import { signJwt } from '../utils/jwt.utils';
import { app } from './server';

const userId = new mongoose.Types.ObjectId().toString();
const sessionId = new mongoose.Types.ObjectId().toString();

const userInput = {
  name: 'Jan',
  lastName: 'Kowalski',
  email: 'jan.kowalski@gmail.com',
  password: 'Jan Kowalski2',
};

const userData = {
  name: 'Jan',
  lastName: 'Kowalski',
  email: 'jan.kowalski@gmail.com',
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};

const createUserPayload = {
  user: {
    ...userData,
    _id: expect.any(String),
    __v: expect.any(Number),
  },
  accessToken: expect.any(String),
  refreshToken: expect.any(String),
};

describe('user', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('get user route', () => {
    let accessToken: string;
    let refreshToken: string;

    describe('create user', () => {
      it('should return a 200', async () => {
        const { statusCode, body } = await supertest(app)
          .post('/api/user')
          .send(userInput);

        expect(statusCode).toBe(200);
        expect(body).toEqual(createUserPayload);

        accessToken = body.accessToken;
        refreshToken = body.refreshToken;
      });
    });

    describe('given the user is not logged in', () => {
      it('should return a 403', async () => {
        const { statusCode } = await supertest(app).get('/api/user');
        expect(statusCode).toBe(403);
      });
    });

    describe('given the user is logged in', () => {
      it('should return a 200 and the user', async () => {
        const { body, statusCode } = await supertest(app)
          .get('/api/user')
          .set('Authorization', `Bearer ${accessToken}`);

        expect(statusCode).toBe(200);
        expect(body).toEqual(userData);
      });
    });
  });
});
