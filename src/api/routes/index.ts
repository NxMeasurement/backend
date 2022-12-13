import { Express } from 'express';
import userRoutes from './user/user.routes';
import sessionRoutes from './session/session.routes';
import clientRoutes from './client/client.routes';
import measurementRoutes from './measurement/measurement.routes';

const routes = (app: Express) => {
  app.use('/api/healthCheck', (req, res) => {
    res.sendStatus(200);
  });
  app.use('/api/user', userRoutes);
  app.use('/api/sessions', sessionRoutes);
  app.use('/api/clients', clientRoutes);
  app.use('/api/measurements', measurementRoutes);
};

export default routes;
