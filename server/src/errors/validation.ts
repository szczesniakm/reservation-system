import { ValidationError } from "express-validator";
import BadRequestError from "./bad-request"

export class RequestValidationError extends BadRequestError {
    errors: ValidationError[];
    constructor(errors: ValidationError[]) {
        super('Validation Error');
        this.errors = errors;
    }
}