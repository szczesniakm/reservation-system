import { StatusCodes } from 'http-status-codes';

export class CustomError extends Error {
  statusCode: StatusCodes = StatusCodes.BAD_REQUEST;

  constructor(message: string, code?: StatusCodes) {
    super(message);
    if (code) {
      this.statusCode = code;
    }
  }
}

export default CustomError;
