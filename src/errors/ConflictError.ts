import CustomError from './CustomError';

class ConflictError extends CustomError<ErrorCode> {
  constructor({
    statusCode = 409,
    message,
    code = 'ERR_CF',
  }: {
    message: string;
    statusCode?: number;
    code?: ErrorCode;
  }) {
    super({ message, statusCode, code });
  }
}

export default ConflictError;
