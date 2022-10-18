import UserController from './../../src/controllers/user.controller';

describe('Unit test for user Controller', () => {
  it('Should be userController start successfully', () => {
    expect(UserController).toBeDefined();
  });

  it('should be create a user controller instance with service and his methods sucessfully', () => {
    const userCtrlInstance = new UserController();
    expect(Object.keys(userCtrlInstance)).toEqual(['userService', 'registerUserCtrl', 'loginUserCtrl', 'renewUserTokenCtrl']);
    expect(userCtrlInstance.loginUserCtrl).toBeDefined();
    expect(userCtrlInstance.registerUserCtrl).toBeDefined();
    expect(userCtrlInstance.renewUserTokenCtrl).toBeDefined();
    expect(typeof userCtrlInstance.loginUserCtrl).toBe('function');
    expect(typeof userCtrlInstance.registerUserCtrl).toBe('function');
    expect(typeof userCtrlInstance.renewUserTokenCtrl).toBe('function');
  });
});
