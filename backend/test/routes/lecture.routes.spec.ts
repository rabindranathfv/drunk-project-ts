import userRoute from './../../src/routes/user.route';

describe('Unit test for lecture route', () => {
  it('Should be lectureRoute start successfully', () => {
    expect(userRoute).toBeDefined();
  });

  it('should be create a lectureRoute instance with router lecture controller and path sucessfully', () => {
    const userRouteInstance = new userRoute();
    expect(userRouteInstance.path).toBe('/user');
    expect(userRouteInstance.router).toBeDefined();
    expect(userRouteInstance.userController).toBeDefined();
  });
});
