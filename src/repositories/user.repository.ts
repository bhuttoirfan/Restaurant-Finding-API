import {user_schema} from '../models/user.model';
import { SaveReqUser, DeleteReqUser } from '../types/request/user.request';

export class MainUser {
    constructor() {}

    saveUser(saveReq: SaveReqUser) {
        return new user_schema(saveReq).save();
    }

    deleteUser(delReq: DeleteReqUser) {
        return user_schema.findByIdAndDelete(delReq._id);
    }

    checkUserList() {
        return user_schema.find();
    }
}