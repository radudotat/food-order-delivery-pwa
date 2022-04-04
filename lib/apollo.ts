import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

// import { string } from 'prop-types';

const apolloClient = new ApolloClient({
  uri: process.env.GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

export default apolloClient;

export async function fetchGetRestaurants(operation: string) {
  const apiUrl: string | undefined = process.env.GRAPHQL_ENDPOINT;

  if (!apiUrl) throw new Error('API address not defined');

  return await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify({
      query: operation,
    }),
  }).then((result) => result.json());
}

export const getRestaurantsQuery = `
  query GetRestaurants {
        restaurants(
            limit: 9,
            where: {address: {_neq: ""}},
            order_by: {name: asc}
        ){
          id
          name
          address
          amenity
          cuisine
          cover
          distance
          location
        }
  }
`;

export const getRestaurantByIdQuery = `
  query GetRestaurants {
        restaurants(
            limit: 9,
            where: {id: {_eq: "13434"}},
            order_by: {name: asc}
        ){
          id
          name
          address
          amenity
          cuisine
          cover
          distance
          location
        }
  }
`;

// const getRestaurantsByLocationQuery = `
//               query GetNearbyRestaurants {
//                 nearby_restaurants(args: {
//                 lat: "${location.coords.latitude}",
//                 lon: "${location.coords.longitude}",
//                 bound: 1000
//                 }, order_by: {
//                 distance: asc
//                 }, limit: 9, offset: 0) {
//                   id
//                   name
//                   address
//                   distance
//                 }
//               }
// `;
export const operation = `
  query GetRestaurants {
    total: restaurants_aggregate(where: {address: {_neq: ""}, _and: {_and: {id: {_gt: 10}}}}) {
      aggregate {
        totalCount: count
      }
    }
    restaurants(limit: 9, where: {address: {_neq: ""}, _and: {_and: {id: {_gt: 10}}}}, order_by: {name: asc}) {
          id
          name
          address
          amenity
          cuisine
          cover
          distance
          location
    }
  }
`;

// Define the mutation
export const UpdateRestaurant = gql`
  mutation UpdateRestaurantMutation(
    $changes: restaurants_set_input
    $id: Int!
  ) {
    update_restaurants_by_pk(pk_columns: { id: $id }, _set: $changes) {
      address
      amenity
      name
      logo
      location
      id
      distance
      cuisine
      cover
    }
  }
`;
