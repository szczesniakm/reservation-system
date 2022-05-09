import { StatusCodes } from 'http-status-codes';
import { CustomError } from './custom-error';

export class UnauthenticatedError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);
  }
}

export default UnauthenticatedError;
