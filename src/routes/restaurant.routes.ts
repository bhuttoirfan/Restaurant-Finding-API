import express from 'express';

import { RestaurantController } from '../controllers/restaurant.controller';
import { GetInfoOfRestaurant, SaveReqRestaurant, DeleteReqRestaurant, FindReqRestaurant } from '../types/request/restaurant.request';
import { SaveDeleteResRestaurant, FoundedRestaurants } from '../types/response/restaurant.response';
import { auth } from '../middlewares/auth.middleware';

export class RestaurantRoutes {
    router: express.Router;

    constructor() {
        
        this.router = express.Router();
        this.routes();
    }

    routes() {

        this.router.post('/saveRestaurant', auth, async (req, res, next) => {
            try{

                const restaurant: SaveReqRestaurant = req.body;
                const new_restaurant: SaveDeleteResRestaurant = await new RestaurantController().saveRestaurant(restaurant);
                
                res.status(200).json({
                    message: 'restaurant added',
                    new_restaurant
                });
            }catch (err) {
                next(err);
            }
        });

        this.router.delete('/deleteRestaurant', auth, async (req, res, next) =>{
            try{

                const rest: DeleteReqRestaurant = req.body;
                const deleted_res: SaveDeleteResRestaurant =<any> await new RestaurantController().deleteRestaurant(rest);

                res.status(200).json({
                    message: 'Restaurant deleted'
                });
            }catch(err){
                next(err);
            }
        });

        this.router.post('/getInfoOfRestaurant', async (req, res, next) => {
            try{

                const res_id: GetInfoOfRestaurant = req.body;
                const res_info: SaveDeleteResRestaurant = await new RestaurantController().getInfoOfRestaurant(res_id);

                res.status(200).json({
                    message: res_info
                });
            }catch(err) { 
                next(err);
            }
        });

        this.router.post('/nearByRestaurants', async (req, res, next) => {
            try{

                const res_coords: FindReqRestaurant = req.body;
                const founded_res: FoundedRestaurants[] = await new RestaurantController().nearByRestaurants(res_coords);

                res.status(400).json({
                    message: 'Founded Restaurants are:',
                    founded_res
                });
            } catch(err) {
                next(err);  
            }
        });
    }
}

export const restaurant_routes_api = new RestaurantRoutes().router;






