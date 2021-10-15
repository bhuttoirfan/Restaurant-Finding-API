import { ICoordinates } from "../document/restaurant.document";

export interface SaveReqRestaurant {
    name: string;
    info: string;
    contact: string;
    location: ICoordinates;
}

export interface GetInfoOfRestaurant {
    _id: string;
}

export interface DeleteReqRestaurant {
    _id: string;
}

export interface FindReqRestaurant {
    location: ICoordinates;
    radius: number;
}