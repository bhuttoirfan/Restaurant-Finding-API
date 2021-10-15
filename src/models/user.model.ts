import { Schema, model } from "mongoose";
import { IUser } from "../types/document/user.document";

const i_user_schema = new Schema({
    name: {type: String},
    cellPhone: {type: String},
    address: {type: String}
}, {timestamps: true});

export const user_schema = model<IUser>('user-schema', i_user_schema);