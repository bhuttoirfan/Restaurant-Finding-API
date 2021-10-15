import { admin_routes_api } from "./admin.routes";
import { user_routes_api } from "./user.routes";
import { restaurant_routes_api } from "./restaurant.routes";

import express from 'express';

export class MainRouter {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    routes() {
        this.router.use('/Admin', admin_routes_api)
        this.router.use('/User', user_routes_api);
        this.router.use('/Restaurant', restaurant_routes_api);
   }
}

export const main_api = new MainRouter().router;