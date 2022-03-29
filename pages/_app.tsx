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
// import { getParsedCookie } from '../lib/cookies';
import { Restaurant } from '../lib/types/restaurants';

interface SentryAppProps extends AppProps {
  err: any;
}

function MyApp({ Component, pageProps }: SentryAppProps) {
  const { isShown, toggle } = useModal();

  const [user, setUser] = useState();

  const refreshUserProfile = useCallback(async () => {
    const response = await fetch('/api/profile');
    const data = await response.json();
    // console.log(data, pageProps);

    if ('errors' in data) {
      // console.log(data.errors);
      setUser(undefined);
      return;
    }

    setUser(data.user);
  }, []);

  // const onConfirm = () => toggle();
  // const onCancel = () => toggle();
  // console.log(apolloClient)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const refreshRestaurants = useCallback(async (...args) => {
    let gql = getRestaurantsQuery;
    // console.log(
    //   '-------------------- refreshRestaurants -----------------',
    //   args,
    //   typeof args[0],
    // );
    if (args.length > 0 && args[0].coords) {
      const location = args[0];
      // const location = getParsedCookie('userLocation');
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
                  location
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
    refreshUserProfile().catch(() => {});
    refreshRestaurants().catch(() => {});
  }, [refreshRestaurants, refreshUserProfile]);

  return (
    <ApolloProvider client={apolloClient}>
      <Component
        {...pageProps}
        userObject={user}
        refreshUserProfile={refreshUserProfile}
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
