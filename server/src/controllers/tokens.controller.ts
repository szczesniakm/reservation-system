import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject } from "inversify";
import { controller, httpPost, requestBody } from "inversify-express-utils";
import { LoginRequest } from "../core/application-types";
import { TYPES } from "../core/types.core";
import { BadRequestError } from "../errors";
import { createToken } from "../services/jwt.service";
import { Logger } from "../services/logger.service";
import { verifyCredentials } from "../services/user.service";

@controller('/tokens')
export class TokensController {
    @inject(TYPES.Logger) 
    private readonly logger: Logger;

    @httpPost('')
    public async createReservation(@requestBody() body: LoginRequest, req: Request, res: Response) {

        if(!body.username || !body.password){
            throw new BadRequestError('Login and password can not be empty.');
        }

        const user = await verifyCredentials(body.username, body.password);

        if(!user) {
            throw new BadRequestError('Invalid credentials.');
        }

        const token = createToken(body.username, user.role);

        res.status(StatusCodes.OK).json({ token: token })
    }
}