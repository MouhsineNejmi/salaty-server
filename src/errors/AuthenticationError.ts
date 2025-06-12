import CustomError from './CustomError';

class AuthenticationError extends CustomError<ErrorCode> {
  constructor({
    statusCode = 401,
    message,
    code = 'ERR_AUTH',
  }: {
    message: string;
    statusCode?: number;
    code?: ErrorCode;
  }) {
    super({ message, statusCode, code });
  }
}

export default AuthenticationError;
