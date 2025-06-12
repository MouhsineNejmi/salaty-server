import CustomError from './CustomError';

class ValidationError extends CustomError<ErrorCode> {
  constructor({
    statusCode = 400,
    message,
    code = 'ERR_VALID',
  }: {
    message: string;
    statusCode?: number;
    code?: ErrorCode;
  }) {
    super({ message, statusCode, code });
  }
}

export default ValidationError;
