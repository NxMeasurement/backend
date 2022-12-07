import routes from '../api/routes';
import responseTime from 'response-time';
import express, { Request, Response } from 'express';
import { restResponseTimeHistogram } from './metrics';
import deserializeUser from '../api/middleware/deserializeUser';

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(deserializeUser);

  routes(app);

  app.use(
    responseTime((req: Request, res: Response, time: number) => {
      if (req?.route?.path) {
        restResponseTimeHistogram.observe(
          {
            method: req.method,
            route: req.route.path,
            status_code: res.statusCode,
          },
          time * 1000
        );
      }
    })
  );

  return app;
};

export default createServer;
