import { Schema, model } from "mongoose";
import { IRestaurant } from "../types/document/restaurant.document";

const i_restaurant_schema = new Schema({
    name: {type: String},
    info: {type: String},
    contact: {type: String},
    location: {
        latitude: {type: Number},
        longitude: {type: Number}
    }
}, {timestamps: true});

export const restaurant_schema = model<IRestaurant>('restaurant-schema', i_restaurant_schema);
