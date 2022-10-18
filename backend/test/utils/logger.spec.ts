import { logger, stream } from '../../src/utils/logger';

describe('Unit test for Logger and stream', () => {
  it('Should be defined loggers and stream sucessfully', () => {
    expect(logger).toBeDefined();
    expect(stream).toBeDefined();
  });

  it('should logger contains levels and levels for loggin properly', () => {
    expect(Object.keys(logger)).toContain('levels');
    expect(Object.keys(logger)).toContain('level');
  });

  it('should stream contains methods for write ', () => {
    expect(stream.write).toBeDefined();
  });
});
