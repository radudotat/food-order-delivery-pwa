import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { useCallback, useEffect, useState } from 'react';
import ModalAuth from '../components/modals/ModalAuth';
import { useModal } from '../components/modals/useModal';
import apolloClient, {
  fetchGetRestaurants,
  getRestaurantsQuery,
} from '../lib/apollo';
import { getParsedCookie } from '../lib/cookies';
import { RestaurantsList } from '../lib/types/restaurants';

interface SentryAppProps extends AppProps {
    err: any;
}

function MyApp({ Component, pageProps }: SentryAppProps) {
  const { isShown, toggle } = useModal();

  // const onConfirm = () => toggle();
  // const onCancel = () => toggle();
  // console.log(apolloClient)
  const [restaurants, setRestaurants] = useState<RestaurantsList[]>([]);
  const refreshRestaurants = useCallback(async (...args) => {
    let gql = getRestaurantsQuery;
    // console.log(
    //   '-------------------- refreshRestaurants -----------------',
    //   args,
    // );
    if (args.length > 0 && args[0] === 'byLocation') {
      const location = getParsedCookie('userLocation');
      gql = `
              query GetNearbyRestaurants {
                nearby_restaurants(args: {
                    lat: "${location.coords.latitude}",
                    lon: "${location.coords.longitude}",
                    bound: 10000
                }, order_by: {
                    distance: asc
                },
                where: {address: {_neq: ""}},
                limit: 9,
                offset: 0) {
                  id
                  name
                  address
                  amenity
                  cover
                  distance
                }
              }
`;
    }
    // console.log('typeof location', location, gql);

    const dataResponse = await fetchGetRestaurants(gql)
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }
        return data;
      })
      .catch((error) => {
        console.error(error);
      });

    if ('errors' in dataResponse) {
      console.error('refreshRestaurants', dataResponse.errors);
      setRestaurants([]);
      return;
    }
    // console.log('---------- fetchGetRestaurants', data, args);
    const newData = dataResponse.restaurants
      ? dataResponse.restaurants
      : dataResponse.nearby_restaurants;
    setRestaurants(newData);
  }, []);

  useEffect(() => {
    refreshRestaurants().catch(() => {});
  }, [refreshRestaurants]);

  return (
    <ApolloProvider client={apolloClient}>
      <Component
        {...pageProps}
        restaurants={restaurants}
        refreshRestaurants={refreshRestaurants}
        err={pageProps.err}
      />
      <ModalAuth
        isShown={isShown}
        hide={toggle}
        headerText="Confirmation"
        modalContent={<div>Modal Content</div>}
      />
    </ApolloProvider>
  );
}

export default MyApp;
