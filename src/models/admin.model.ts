import { Schema, model } from "mongoose";
import { IAdmin } from "../types/document/admin.document";

const i_admin_schema = new Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String}
}, {timestamps: true});

export const admin_schema = model<IAdmin> ('admin-schema', i_admin_schema);