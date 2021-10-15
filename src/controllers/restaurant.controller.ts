import { IRestaurant } from "../types/document/restaurant.document";
import { MainRestaurant } from "../repositories/restaurant.repository";
import { SaveDeleteResRestaurant, FoundedRestaurants } from "../types/response/restaurant.response";
import { SaveReqRestaurant, DeleteReqRestaurant, GetInfoOfRestaurant, FindReqRestaurant } from "../types/request/restaurant.request";

import { Body, Route, Tags, Post, Delete, SuccessResponse, Security } from 'tsoa';
import customError from '../utils/error.utils';
import { getDistance } from "geolib";

 @Route('Restaurant')
 @Tags('Restaurant Routes')
 export class RestaurantController {
    constructor() {}

    @Security('api_key')
    @Post('/saveRestaurant')
    async saveRestaurant(@Body() restaurant: SaveReqRestaurant): Promise<SaveDeleteResRestaurant> {

      const new_restaurant: IRestaurant =<any> await new MainRestaurant().saveRestaurant(restaurant);
      if (!new_restaurant) throw new customError(404, 'Restaurant not added.')

      return <SaveDeleteResRestaurant>new_restaurant;
    }

    @Post('/getInfoOfRestaurant')
    async getInfoOfRestaurant(@Body() infoReq: GetInfoOfRestaurant): Promise<SaveDeleteResRestaurant> {

        const restaurant_info: IRestaurant =<any> await new MainRestaurant().getInfoOfRestaurant(infoReq);
        return <SaveDeleteResRestaurant>restaurant_info;
    }

    @Security('api_key')
    @Delete('/deleteRestaurant')
    @SuccessResponse('200', 'Restaurant deleted from database.')
    async deleteRestaurant(@Body() delRestaurant: DeleteReqRestaurant) {
        return await new MainRestaurant().deleteRestaurant(delRestaurant);
    }

    @Post('/nearByRestaurants')
    async nearByRestaurants(@Body() restaurantReq: FindReqRestaurant ): Promise<FoundedRestaurants[]> {

      const list_of_restaurants: SaveDeleteResRestaurant[] =<any> await new MainRestaurant().listOfRestaurants();

      let foundedRestaurants: FoundedRestaurants[] = [];
      
      console.log("Given Values:")
      console.log(restaurantReq.location.latitude)
      console.log(restaurantReq.location.longitude)
      console.log("Ends here:")


      list_of_restaurants.map((cur) => {

        const distance = getDistance(
          {latitude: cur.location.latitude, longitude: cur.location.longitude},
          {latitude: restaurantReq.location.latitude, longitude: restaurantReq.location.longitude}
        );

        if(distance < restaurantReq.radius) {
          
          const founded_restaurant = {
            name: cur.name,
            info: cur.info,
            contact: cur.contact,
            distance: distance
          }

          foundedRestaurants.push(founded_restaurant);
        }
      });

      return foundedRestaurants;
    }
 }