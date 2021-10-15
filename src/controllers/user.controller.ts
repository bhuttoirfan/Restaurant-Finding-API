import { IUser } from "../types/document/user.document";
import { SaveDeleteResUser } from "../types/response/user.response";
import { MainUser } from "../repositories/user.repository";
import { SaveReqUser, DeleteReqUser } from "../types/request/user.request";

import { Get, Post, Delete, SuccessResponse, Route, Tags, Body, Security } from 'tsoa';
import customError from '../utils/error.utils';

@Route('User')
@Tags('User Routes')
export class UserController {
    constructor() {}

    @Post('/saveUser')
    async saveUser(@Body() user: SaveReqUser): Promise<SaveDeleteResUser> {

        const new_user: IUser =<any> await new MainUser().saveUser(user);
        if(!new_user) throw new customError(404, 'User not saved');

        return <SaveDeleteResUser>new_user;
    }

    @Security('api_key')
    @Delete('/deleteUser')
    @SuccessResponse('200', 'User deleted from database')
    async deleteUser(@Body() delUser: DeleteReqUser) {
        console.log(`user delete in controller`);
        return await new MainUser().deleteUser(delUser);
    }

    @Security('api_key')
    @Get('/checkUserList')
    async checkUserList(): Promise<SaveDeleteResUser[]> {

        const users_list: IUser[] =<any> await new MainUser().checkUserList();

        return <SaveDeleteResUser[]>users_list;
    }
}