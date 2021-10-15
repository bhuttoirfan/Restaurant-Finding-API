import express from 'express';

import { UserController } from '../controllers/user.controller';
import { SaveDeleteResUser } from '../types/response/user.response';
import { SaveReqUser, DeleteReqUser } from '../types/request/user.request';
import { auth } from '../middlewares/auth.middleware';

export class UserRoutes {

    router: express.Router;

    constructor() {
        
        this.router = express.Router();
        this.routes();
    }

    routes() {

        this.router.post('/saveUser', async (req, res, next) => {
            try{

                const user: SaveReqUser = req.body;
                const new_user: SaveDeleteResUser = await new UserController().saveUser(user);
                
                res.status(400).json({
                    message: 'user saved',
                    new_user
                });
            }catch (err) {
                next(err);
            }
        });

        this.router.delete('/deleteUser', auth, async (req, res, next) => {
            console.log('Delete user in routes');
            try{
                
                const user: DeleteReqUser = req.body;
                console.log('Delete user: ' + user);
                const deleted_user = await new UserController().deleteUser(user);
                
                res.status(200).json({
                    message: 'User deleted'
                });
            }catch(err) {
                next(err);
            }
        });

        this.router.get('/checkUserList', auth, async (req, res, next) => {
            try{

                const users_list: SaveDeleteResUser[] = await new UserController().checkUserList();
                res.status(200).json({
                    message: 'User list:',
                    users_list
                });
            }catch(err) {
                next(err);
            }    
        });
    }
}

export const user_routes_api = new UserRoutes().router;