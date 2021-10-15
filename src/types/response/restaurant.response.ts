import { ICoordinates } from "../document/restaurant.document";

export interface SaveDeleteResRestaurant {
    _id: string;
    name: string;
    info: string;
    contact: string;
    location: ICoordinates
    createdAt: string;
    updatedAt: string;
}

export interface FoundedRestaurants {
    name: string;
    info: string;
    contact: string;
    distance: number;
}