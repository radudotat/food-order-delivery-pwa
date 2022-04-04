// import { NextApiRequest } from 'next';

export type Restaurant = {
  id: number;
  name: string;
  address: string;
  amenity: string;
  cuisine: string;
  cover: string;
  distance: number;
  location: any;
  imagesUrl: string;
};

export type IndexResponseBody = {
  restaurants: string;
};

// type RestaurantRequestBody = {
//   restaurant: Restaurant;
// };

// type RestaurantNextApiRequest = Omit<NextApiRequest, 'body'> & {
//   body: RestaurantRequestBody;
// };
