import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import displayRoutes from 'express-routemap';

import { NODE_ENV, PORT, LOG_FORMAT } from './config/config';
import { corsConfig } from './config/cors.config';
import { Routes } from './interfaces/route.interface';

import errorMiddleware from './middleware/error.middleware';
import { rateLimiterUsingThirdParty } from './middleware/rateLimiter.middleware';
import { logger, stream } from './utils/logger';
import { optionsSwagger } from './config/swagger.config';

import { API_BASE_ROUTE } from './constants';
import { dbConnection } from './db/mongo.config';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public server: any;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.server = this.app.listen(this.port, () => {
      displayRoutes(this.app);
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} ========`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public closeServer(done?: any) {
    this.server = this.app.listen(this.port, () => {
      done();
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    await dbConnection();
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT ?? '../logs', { stream }));
    this.app.use(cors(corsConfig));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(rateLimiterUsingThirdParty);
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use(`${API_BASE_ROUTE}`, route.router);
    });
  }

  private initializeSwagger() {
    const specs = swaggerJSDoc(optionsSwagger);
    this.app.use(`${API_BASE_ROUTE}docs`, swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
