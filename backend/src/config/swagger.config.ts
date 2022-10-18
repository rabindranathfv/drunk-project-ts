import { PORT } from './config';

export const optionsSwagger = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Swagger DOCS API',
      version: '1.0.0',
      description: 'base node express in ts',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};
