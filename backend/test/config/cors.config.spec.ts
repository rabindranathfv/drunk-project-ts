import { corsConfig } from './../../src/config/cors.config';

describe('Unit test for cors.config.ts', () => {
  it('Load config from enviroments', () => {
    expect(corsConfig).toEqual({
      allowedHeaders: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      origin: '*',
    });
  });
});
