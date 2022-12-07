import supertest from 'supertest';
import { app } from './server';

describe('healthCheck', () => {
  it('should return status 200', async () => {
    await supertest(app).get('/api/healthCheck').expect(200);
  });
});
