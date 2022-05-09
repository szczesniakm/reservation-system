import * as dotenv from "dotenv";
dotenv.config();
import * as bodyParser from 'body-parser';
import { InversifyExpressServer } from "inversify-express-utils";
import { handleError } from '../middlewares/error-handler.middleware';
import { container } from "./container.core";
import cors from 'cors';

export const server = new InversifyExpressServer(container);
server.setConfig(app => {
    app.use(cors());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
});
server.setErrorConfig(app => {
    app.use(handleError);
});