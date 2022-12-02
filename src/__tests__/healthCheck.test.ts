import supertest from 'supertest';
import createServer from '../utils/server';

const app = createServer();

describe('healthCheck', () => {
  it('should return status 200', async () => {
    await supertest(app).get('/api/healthCheck').expect(200);
  });
});
