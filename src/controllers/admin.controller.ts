import { MainAdmin } from "../repositories/admin.respository";
import { SaveLoginResAdmin } from "../types/response/admin.response";
import { IAdmin } from "../types/document/admin.document";
import { SaveReqAdmin, LoginReqAdmin } from "../types/request/admin.request";

import { Post, Body, Route, Tags } from 'tsoa';
import customError from '../utils/error.utils';

@Route('Admin')
@Tags('Admin Routes')
export class AdminController {
    constructor() {}

    @Post('/saveAdmin')
    async saveAdmin(@Body() admin: SaveReqAdmin): Promise<SaveLoginResAdmin> {

        const new_admin: IAdmin =<any> await new MainAdmin().saveAdmin(admin);
        if(!new_admin) throw new customError(404, 'Admin not saved');
        
        return <SaveLoginResAdmin>new_admin;
    }

    @Post('/loginAdmin')
    async loginAdmin(@Body() admin: LoginReqAdmin): Promise<SaveLoginResAdmin> {
        
        const login_admin: IAdmin =<any> await new MainAdmin().findAdmin(admin);
        
        return <SaveLoginResAdmin>login_admin;
    }
}