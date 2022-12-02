import { Express, Request, Response } from 'express';

const routes = (app: Express) => {
  app.use('/api/healthCheck', (req, res) => {
    res.sendStatus(200);
  });
};

export default routes;
