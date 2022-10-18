import { optionsSwagger } from './../../src/config/swagger.config';
import { logger } from '../../src/utils/logger';

describe('Unit test for swagger.config.ts', () => {
  it('Load swagger config for documentation', () => {
    logger.info(JSON.stringify(optionsSwagger));
    expect(optionsSwagger).toEqual({
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Swagger DOCS API',
          version: '1.0.0',
          description: 'base node express in ts',
        },
        servers: [
          {
            url: `http://localhost:3000`,
          },
        ],
      },
      apis: ['./src/routes/*.ts'],
    });
  });
});
