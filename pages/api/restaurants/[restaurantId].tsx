import { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from "@sentry/nextjs";

import {
  deleteRestaurantById,
  getRestaurantById,
  updateRestaurantById,
} from '../../../lib/restaurants';
import { Restaurant } from '../../../lib/types/restaurants';

type RestaurantRequestBody = {
  restaurant: Restaurant;
};

type RestaurantNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: RestaurantRequestBody;
};

export type RestaurantResponseBody =
  | { error: string }
  | { restaurant: Restaurant };

const handler = async function handler(
  request: RestaurantNextApiRequest,
  response: NextApiResponse<RestaurantResponseBody>,
) {
  console.log('is this the id', request.query.restaurantId);
  response.status(200).json({ error: 'restaurant found' });
  const restaurantId = Number(request.query.restaurantId);
  // check that the id passed is a number

  console.log(restaurantId);
  // check if restaurantId is not a number
  if (!restaurantId) {
    response.status(400).json({ error: 'restaurantId must be a number' });
    return;
  }

  if (request.method === 'GET') {
    const restaurant = await getRestaurantById(restaurantId);

    // check if there is not restaurant with the id passed into the database
    console.log(restaurant);

    // if (!restaurant) {
    //   response.status(404).json({ error: 'restaurant not found' });
    //   return;
    // }

    // if the method is GET return the restaurant with the matched id
    // response.status(200).json({ restaurant: restaurant });
    return;
  } else if (request.method === 'PUT') {
    // if the method is PUT update the restaurant and response the updated restaurant

    // access the body restaurant from the request object
    const restaurantFromRequest = request.body.restaurant;

    // TODO: create error responses when the body don't have the full data. with a 400 status code

    const updatedRestaurant = updateRestaurantById(
        restaurantFromRequest.id,
    );

    if (!updatedRestaurant) {
      response.status(404).json({ error: 'restaurant not found' });
      return;
    }

    // response.status(200).json({ restaurant: updatedRestaurant });
    return;
  } else if (request.method === 'DELETE') {
    // if the method is DELETE delete the restaurant matching the id and response the deleted restaurant
    const deletedRestaurant = await deleteRestaurantById(restaurantId);

    if (!deletedRestaurant) {
      response.status(404).json({ error: 'restaurant not found' });
      return;
    }

    // response.status(200).json({ restaurant: deletedRestaurant });
    return;
  }

  response.status(405).json({ error: 'Method not Allowed' });
}

export default withSentry(handler);
