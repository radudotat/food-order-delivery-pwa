import { ApolloClient, InMemoryCache } from '@apollo/client';

// import { string } from 'prop-types';

const apolloClient = new ApolloClient({
  uri: process.env.GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

export default apolloClient;

export type Restaurant = {
  id: number;
  name: string;
  address: string;
  distance: number;
};

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
