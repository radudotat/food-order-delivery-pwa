// export type Restaurant = {
//     id: number;
//     menuId: number;
//     categoryId: number;
//     name: string;
//     price: number;
// };

export type Restaurant = {
    id: number;
    name: string;
    address: string;
    distance: number;
};

export type RestaurantsList = [];

export  type IndexResponseBody = {
    restaurants: string;
};
