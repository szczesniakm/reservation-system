import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../core/application-types';

export const createToken = (username: string, role: string) => {
    let payload: JwtPayload = {
        username: username,
        role: role
    };
    const secret = process.env.JWT_SECRET;
    let token = jwt.sign(payload, secret, {
        expiresIn: process.env.JWT_EXPIRY_MINUTES,
        issuer: process.env.JWT_ISS,
    });

    return token;
}