import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors";

export function handleError(error: Error, req: Request, res: Response, next: NextFunction) {
    if(!error) {
        next();
    }

    let response;
    if(error instanceof CustomError) {
        response = {
            statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.statusCode ? error.message : "An unexpected error occured."
        };
        return res.status(response.statusCode).json({ message: response.message });
    } 
    
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
}