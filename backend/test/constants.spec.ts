import { API_VERSION } from '../src/config/config';
import { API_BASE_ROUTE } from '../src/constants';

describe('Unit test for CONSTANTS', () => {
  test('should load CONSTANTS Successfully', () => {
    expect(API_BASE_ROUTE).toBe(`/api/${API_VERSION}/`);
  });
});
