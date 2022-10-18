import { HttpException } from '../../src/exceptions/HttpException';

describe('Unit test for HttpException', () => {
  it('Should be HttpException loaded successfully', () => {
    expect(HttpException).toBeDefined();
  });

  it('should first throw new httpException and cacth with specific parameters', () => {
    try {
      throw new HttpException(404, 'not resource found');
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe('not resource found');
    }
  });
});
