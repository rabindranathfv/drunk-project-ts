import request from 'supertest';

import App from '../src/app';
import userRoute from '../src/routes/user.route';

import { API_BASE_ROUTE } from './../src/constants';

describe('Users Management - Functional Tests', () => {
  let app: App;
  let userRoutes: userRoute;

  beforeEach(() => {
    userRoutes = new userRoute();
    app = new App([userRoutes]);
    app.listen();
  });

  afterEach((done) => {
    app.server.close(done);
  });

  it('Should create the register and make login successfully', async () => {
    let res = await request(app.getServer())
      .post(`${API_BASE_ROUTE}${userRoutes.path}`)
      .send({ email: 'email@test.com', name: 'rabindranath', password: 'password1' });

    expect(res.statusCode).toBe(201);
    const { user, token, ok } = res.body;
    console.log('🚀 ~ file: functionalTest.spec.ts ~ line 29 ~ it ~ user', user);
    expect(user).toBeDefined();
    expect(ok).toBeTruthy();
    expect(typeof token).toBe('string');

    res = await request(app.getServer()).post(`${API_BASE_ROUTE}${userRoutes.path}`).send({ email: user.email, password: user.password });

    expect(res.statusCode).toBe(200);
    const { token: tokenAuth } = res.body;
    expect(tokenAuth).toBe('some-valid-token');
    expect(typeof tokenAuth).toBe('string');
  });
});
