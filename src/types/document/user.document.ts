import { Document } from "mongoose";

export interface IUser extends Document {
    _id?: string;
    name: string;
    cellPhone: string;
    address: string;
    createdAt?: string;
    updatedAt?: string;
}