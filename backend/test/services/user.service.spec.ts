import UserService from '../../src/service/user.service';

describe('Unit test for userService', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be created UserService', () => {
    expect(service).toBeDefined();
  });
});
