import { StatusCodes } from 'http-status-codes';
import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export default NotFoundError;
