import { Express, Request, Response } from 'express';
import userRoutes from './user/user.routes';
import sessionRoutes from './session/session.routes';

const routes = (app: Express) => {
  app.use('/api/healthCheck', (req, res) => {
    res.sendStatus(200);
  });
  app.use('/api/user', userRoutes);
  app.use('/api/sessions', sessionRoutes);
};

export default routes;
