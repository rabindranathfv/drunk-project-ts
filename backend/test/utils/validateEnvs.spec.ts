import validateEnv from '../../src//utils/validateEnvs';

describe('Unit test for validateEnvs', () => {

    const originalEnv = process.env;
    const realProcessExit = process.exit;
    process.exit = jest.fn(() => { throw "mockExit"; });

    afterAll(() => { process.exit = realProcessExit; });

    beforeEach(() => {
      jest.resetModules();
      process.env = {
        ...originalEnv,
        PORT: 'FFFFF',
      };
    })

    afterEach(() => {
      process.env = originalEnv;
    });

  it('Should validate Envs loading from process.env', () => {
    expect(validateEnv).toBeDefined();
   })

   it('Should fails and show process exit because PORT is not valid', () => {
    try {
      validateEnv()
    } catch (error) {
      expect(error).toBe("mockExit");
      expect(process.exit).toBeCalledWith(1);
    }
    })
 })