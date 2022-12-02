import dotenv from 'dotenv';
dotenv.config();
import logger from './utils/logger';
import dbConnect from './utils/dbConnect';
import createServer from './utils/server';

// export const app = express();
const port = process.env.PORT || 1337;
const app = createServer();

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  await dbConnect();
});
