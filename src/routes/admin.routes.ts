import express from 'express';
import jwt from 'jsonwebtoken';

import { AdminController } from '../controllers/admin.controller';
import { SaveReqAdmin, LoginReqAdmin } from '../types/request/admin.request';
import { SaveLoginResAdmin } from '../types/response/admin.response';

export class AdminRoutes {
    router: express.Router;

    constructor() {
        
        this.router = express.Router();
        this.routes();
    }

    routes() {

        this.router.post('/saveAdmin', async(req, res, next) => {
            try{

                const admin: SaveReqAdmin = req.body;
                const new_admin: SaveLoginResAdmin = await new AdminController().saveAdmin(admin);
                
                res.status(200).json({
                    message: new_admin
                });
            }catch(err) {
                next(err);
            }
        });

        this.router.post('/loginAdmin', async (req, res, next) => {
            try {

                const auth_req: LoginReqAdmin = req.body;
                const auth_user: SaveLoginResAdmin = await new AdminController().loginAdmin(auth_req);

                if(auth_user) {
                    if(auth_user.email === auth_req.email && auth_user.password === auth_req.password) {

                        return res.json({
                            token: jwt.sign(
                                {_id: auth_user._id}, 'this is the key'
                            )
                        });
                    }else {
                        res.status(400).json({ message: 'User not found'});
                    }
                }else{
                    
                    res.status(400).json({ message: 'User not found'});
                }
            }catch(err) {
                next(err);
            }
        });
    }
}

export const admin_routes_api = new AdminRoutes().router;