import CustomError from './CustomError';

class EntityNotFoundError extends CustomError<ErrorCode> {
  constructor({
    statusCode = 404,
    message,
    code = 'ERR_NF',
  }: {
    message: string;
    statusCode?: number;
    code?: ErrorCode;
  }) {
    super({ message, statusCode, code });
  }
}

export default EntityNotFoundError;
