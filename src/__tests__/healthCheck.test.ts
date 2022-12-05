import { MongoMemoryServer } from 'mongodb-memory-server';
import supertest from 'supertest';
import createServer from '../utils/server';
import mongoose from 'mongoose';

const app = createServer();

describe('healthCheck', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  it('should return status 200', async () => {
    await supertest(app).get('/api/healthCheck').expect(200);
  });
});
