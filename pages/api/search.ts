import { NextApiRequest, NextApiResponse } from 'next';
import { getSortedRestaurantsData } from '../../lib/restaurants';
import { IndexResponseBody, Restaurant } from '../../lib/types/restaurants';

// import {nearby_restaurants} from "../../cache/data/restaurants";

const restaurants =
  process.env.NODE_ENV !== 'production'
    ? require('../../cache/data/restaurants').nearby_restaurants
    : getSortedRestaurantsData();

export default function searchRestaurants(
  req: NextApiRequest,
  res: NextApiResponse<IndexResponseBody>,
) {
  const results = req.query.q
    ? restaurants.filter((restaurant: Restaurant) =>
        restaurant.name.toLowerCase().includes(req.query.q as string),
      )
    : [];
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ results }));
}
