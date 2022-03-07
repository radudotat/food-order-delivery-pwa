import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ApolloProvider} from '@apollo/client'
import apolloClient from '../lib/apollo'
import Layout from '../components/Layout'
import {useState} from "react";
import {Restaurant} from "../lib/types/restaurants";

function MyApp({Component, pageProps}: AppProps) {
    // console.log(apolloClient)
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    return (
        <ApolloProvider client={apolloClient}>
            <Layout>
                <Component {...pageProps} restaurants={restaurants} setRestaurants={setRestaurants}/>
            </Layout>
        </ApolloProvider>
    )
}

export default MyApp
