import { SaveReqRestaurant, DeleteReqRestaurant, GetInfoOfRestaurant } from "../types/request/restaurant.request";
import { restaurant_schema } from "../models/restaurant.model";

export class MainRestaurant {
    constructor() {}

    saveRestaurant(saveReq: SaveReqRestaurant) {
        return new restaurant_schema(saveReq).save();
    }

    deleteRestaurant(delReq: DeleteReqRestaurant) {
        return restaurant_schema.findByIdAndDelete(delReq._id);
    }

    getInfoOfRestaurant(getReq: GetInfoOfRestaurant) {
        return restaurant_schema.findById(getReq._id);
    }

    listOfRestaurants() {
        return restaurant_schema.find();
    }
}