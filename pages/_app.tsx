import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import Layout from '../components/Layout';
import apolloClient from '../lib/apollo';
import { Restaurant } from '../lib/types/restaurants';

function MyApp({ Component, pageProps }: AppProps) {
  // console.log(apolloClient)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component
          {...pageProps}
          restaurants={restaurants}
          setRestaurants={setRestaurants}
        />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
