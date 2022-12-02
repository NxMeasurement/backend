// import logger from 'pino';
import dayjs from 'dayjs';
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default logger;
