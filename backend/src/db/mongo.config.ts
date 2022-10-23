import { connect, ConnectOptions } from 'mongoose';
import { DB_CNN, DB_DATABASE, DB_HOST, DB_PORT } from '../config/config';
import { logger } from '../utils/logger';

export const configConnection = {
  url: DB_CNN ?? `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

export const dbConnection = async () => {
  try {
    await connect(configConnection.url, configConnection.options as ConnectOptions);
    logger.info(`=================================`);
    logger.info('=== DB connected Sucessfully ====');
    logger.info(`========== ${DB_CNN} ============`);
    logger.info(`=================================`);
  } catch (error) {
    logger.error(error);
    throw new Error('Error starting DB');
  }
};
