import { Request, response, Response } from "express";
import { body, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { inject } from "inversify";
import { controller, httpPost, request, requestBody } from "inversify-express-utils";
import { LoginRequest } from "../core/models";
import { TYPES } from "../core/types.core";
import { RequestValidationError } from "../errors/validation";
import { createToken } from "../services/jwt.service";
import { Logger } from "../services/logger.service";
import { verifyCredentials } from "../services/user.service";

const _loginValidators = [
    body('username').notEmpty().withMessage('Nazwa użytkownika jest wymagana.'), 
    body('password').notEmpty().withMessage('Hasło jest wymagane.')
];

@controller('/tokens')
export class TokensController {
    @inject(TYPES.Logger) 
    private readonly logger: Logger;

    @httpPost('', ..._loginValidators)
    public async login(@requestBody() body: LoginRequest, req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }

        const user = await verifyCredentials(body.username, body.password);
        const token = createToken(body.username, user.role);

        this.logger.log(`${user.username} has logged in.`);
        res.status(StatusCodes.OK).json({ token: token })
    }
}