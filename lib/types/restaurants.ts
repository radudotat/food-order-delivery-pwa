export type Restaurant = {
  id: number;
  name: string;
  address: string;
  amenity: string;
  cover: string;
  distance: number;
  location: any;
};

export type RestaurantsList = {
  id: number;
  name: string;
}[];

export type IndexResponseBody = {
  restaurants: string;
};
