import errorMiddleware from './../../src/middleware/error.middleware';

describe('Unit test for errorMiddleware', () => {

  const httpExceptionMock = jest.fn();
  const reqMock = jest.fn();
  const resMock = jest.fn();
  const nextMock = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Should be errorMiddleware loaded successfully', () => {
    expect(errorMiddleware).toBeDefined();
   })

   it('should first throw new errorMiddleware with httpException with no params and returns 500', () => {
      try {
        httpExceptionMock.mockReturnValue({ error: { status: undefined, message: undefined }})
        errorMiddleware(httpExceptionMock(), reqMock, resMock, nextMock)
      } catch (error) {
        expect(error.status).toBe(500)
        expect(error.message).toBe('Something went wrong')
      }
    })

 })