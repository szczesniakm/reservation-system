import { Request, Response, NextFunction } from "express";
import { BaseMiddleware } from "inversify-express-utils";
import { UnauthenticatedError } from "../errors";
import * as jwt from 'jsonwebtoken';
import { injectable } from "inversify";

type JwtPayload = {
    username: string,
    role: string
}

@injectable()
export class AuthenticationMiddleware extends BaseMiddleware {
    handler(req: Request & { user: JwtPayload }, res: Response, next: NextFunction): void {
        let token: string;
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer')) {
            throw new UnauthenticatedError("Token is required.")
        }

        token = authHeader.split(' ')[1];
        if(!token) {
            throw new UnauthenticatedError("Token not found.");
        }

        try {
            const decoded = jwt.verify(token, (process.env.JWT_SECRET));
            
            req.user = {
                username: decoded.username,
                role: decoded.role
            };
            next();
        } catch (error) {
            next(new UnauthenticatedError("Invalid token."));
        }
    }

}