import userRoute from '../../src/routes/user.route';

describe('Unit test for user route', () => {
  it('Should be userRoute start successfully', () => {
    expect(userRoute).toBeDefined();
  });

  it('should be create a userRoute instance with use User controller and path sucessfully', () => {
    const userRouteInstance = new userRoute();
    expect(userRouteInstance.path).toBe('/user');
    expect(userRouteInstance.router).toBeDefined();
    expect(userRouteInstance.userController).toBeDefined();
  });
});
