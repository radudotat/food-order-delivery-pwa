import { withSentry } from '@sentry/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSortedRestaurantsData } from '../../lib/restaurants';
import { IndexResponseBody } from '../../lib/types/restaurants';

// import {nearbyRestaurants} from "../../cache/data/restaurants";

// const restaurants = getSortedRestaurantsData(q);
// navigator.onLine
// ? getSortedRestaurantsData()
// : require('../../cache/data/restaurants').nearby_restaurants

const handler = function handler(
  req: NextApiRequest,
  res: NextApiResponse<IndexResponseBody>,
) {
  const restaurants = getSortedRestaurantsData(req.query.q);
  console.log('getSortedRestaurantsData', restaurants, res);

  // const results = restaurants
  //     ? restaurants.filter((restaurant: Restaurant) =>
  //         restaurant.name.toLowerCase().includes(req.query.q as string),
  //     )
  //     : [];
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'application/json');
  // res.end(JSON.stringify({results}));
};

export default withSentry(handler);
