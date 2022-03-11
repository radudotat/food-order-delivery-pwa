/*
export async function fetchGetRestaurants(op: string) {
    return await fetch(`process.env.GRAPHQL_ENDPOINT`, {
        method: 'POST',
        body: JSON.stringify({
            query: op,
        }),
    })
        .then((result) => result.json())
        .catch(console.error);
}
*/

import { fetchGetRestaurants } from './apollo';

export async function getSortedRestaurantsData(q: string | string[]) {
  const gql = `
      query SearchRestaurantsQuery {
        search_restaurants(
        limit: 9,
        args: {search: "${q}"}) {
          id
          name
          address
          amenity
          cuisine
          cover
        }
      }
    `;

  const response = await fetchGetRestaurants(gql);

  console.log(response);

  return { response };
}

export async function getRestaurantById(id: number) {
  const gql = `
  query GetRestaurantById {
        restaurants(
            limit: 1,
            where: {id: {_eq: "${id}"}}
        ){
          id
          name
          address
          amenity
          cuisine
          cover
          distance
        }
  }
`;

  const response = await fetchGetRestaurants(gql);

  console.log('getRestaurantById', response);

  return { response };
}
