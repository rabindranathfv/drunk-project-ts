import {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  API_VERSION,
} from '../../src/config/config';

describe('Unit test for config.ts', () => {
  it('Load config from .env.test.local enviroments', () => {
    expect(NODE_ENV).toBe('test');
    expect(PORT).toBe('3000');
    expect(DB_HOST).toBe('localhost');
    expect(DB_PORT).toBe('3306');
    expect(DB_USER).toBe('root');
    expect(DB_PASSWORD).toBe('password');
    expect(DB_DATABASE).toBe('test');
    expect(SECRET_KEY).toBe('secretKey');
    expect(LOG_FORMAT).toBe('dev');
    expect(LOG_DIR).toBe('../logs');
    expect(ORIGIN).toBe('*');
    expect(API_VERSION).toBe('v1');
  });
});
