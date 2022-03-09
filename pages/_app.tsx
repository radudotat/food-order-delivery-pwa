import '../styles/globals.css';
import {ApolloProvider} from '@apollo/client';
import type {AppProps} from 'next/app';
import {useCallback, useEffect, useState} from 'react';
import apolloClient, {fetchGetRestaurants, getRestaurantsQuery} from '../lib/apollo';
import {Restaurant} from '../lib/types/restaurants';
import {getParsedCookie} from "../lib/cookies";

function MyApp({Component, pageProps}: AppProps) {
    // console.log(apolloClient)
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const refreshRestaurants = useCallback(async (...args) => {
        let gql = getRestaurantsQuery;
        console.log('-------------------- refreshRestaurants -----------------', args)
        if (args.length > 0 && args[0] === 'byLocation') {
            let location = getParsedCookie('userLocation');
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
                  distance
                }
              }
`;
        }
        console.log('typeof location', location, gql)

        const data = await fetchGetRestaurants(gql)
            .then(({data, errors}) => {
                if (errors) {
                    console.error(errors);
                }
                return data;
            })
            .catch((error) => {
                console.error(error);
            });

        if ('errors' in data) {
            console.error('refreshRestaurants', data.errors);
            setRestaurants([]);
            return;
        }
        // console.log('---------- fetchGetRestaurants', data, args);
        let newData = data.restaurants ? data.restaurants : data.nearby_restaurants;
        setRestaurants(newData);
    }, []);

    useEffect(() => {
        refreshRestaurants().catch(() => {
        });
    }, [refreshRestaurants]);

    return (
        <ApolloProvider client={apolloClient}>
            <Component
                {...pageProps}
                restaurants={restaurants}
                refreshRestaurants={refreshRestaurants}
            />
        </ApolloProvider>
    );
}

export default MyApp;
