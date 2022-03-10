export type Restaurant = {
  id: number;
  name: string;
  address: string;
  amenity: string;
  distance: number;
};

export type RestaurantsList = {
  id: number;
  name: string;
};

export type IndexResponseBody = {
  restaurants: string;
};
