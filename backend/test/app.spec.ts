import App from '../src/app';

describe('Unit test for App', () => {
  it('Should be App start successfully', () => {
    expect(App).toBeDefined();
  });

  it('should be App instance router and attribuites like app, env and port', () => {
    const emptyRoutesMock: any = [];
    const AppInstance = new App(emptyRoutesMock);
    expect(Object.keys(AppInstance)).toContain('app');
    expect(Object.keys(AppInstance)).toContain('env');
    expect(Object.keys(AppInstance)).toContain('port');
    expect(AppInstance.port).toBe('3000');
    expect(AppInstance.env).toBe('test');
    expect(AppInstance.app._router).toBeDefined();
    expect(AppInstance.app._router._params).toEqual(emptyRoutesMock);
  });
});
