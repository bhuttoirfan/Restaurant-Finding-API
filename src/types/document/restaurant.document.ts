import { Document } from "mongoose";

export interface IRestaurant extends Document {
    _id?: string;
    name: string;
    info: string;
    contact: string;
    location: ICoordinates;
    createdAt?: string;
    updatedAt?: string;
}

export interface ICoordinates {
    latitude: number,
    longitude: number
}