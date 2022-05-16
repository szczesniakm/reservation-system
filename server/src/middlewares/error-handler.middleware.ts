import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors";
import { RequestValidationError } from "../errors/validation";

export function handleError(error: Error, req: Request, res: Response, next: NextFunction) {
    if(!error) {
        next();
    }
    let response;
    if(error instanceof RequestValidationError) {
        response = {
            errors: error.errors
        };
    }
    if(error instanceof CustomError) {
        response = {
            ...response, 
            statusCode: error.statusCode,
            message: error.message
        };
        return res.status(response.statusCode).json(response);
    } 
    
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Wystąpił nieoczekiwany błąd." });
}