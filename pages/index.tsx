// import type { NextPage } from 'next';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
// import Image from 'next/image'
import { useEffect } from 'react';
import { Bag, Drone } from '../components/icons';
import RequestPositionButton from '../components/RequestPositionButton';
import Search from '../components/Search';
import { fetchGetRestaurants, getRestaurantsQuery } from '../lib/apollo';
import { createCsrfToken } from '../lib/auth';
import { Restaurant } from '../lib/types/restaurants';
// import { watchGeolocation } from '../helpers/geolocation';
import styles from '../styles/Home.module.css';

// import {DocumentNode, gql, useQuery} from '@apollo/client'
// import {graphql} from 'graphql'

// type Props = {
//   csrfToken: string;
//   client: any;
// };

export default function Home(props: any) {
  useEffect(() => {
    fetchGetRestaurants(getRestaurantsQuery)
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }
        console.log(data, props);
        props.setRestaurants(data.restaurants);
      })
      .catch((error) => {
        console.error(error);
      });

    if ('serviceWorker' in navigator) {
      const sw = navigator.serviceWorker;
      window.addEventListener('load', () => {
        sw.register('/service-worker.js')
          .then(() => sw.ready)
          .then(() => {
            sw.addEventListener('message', ({ data }) => {
              if (data?.state !== undefined) {
                // setCounter(data.state);
                console.log(data);
              }
            });
          })
          .catch(console.error);
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <title>Food Ordering App</title>
        <meta
          name="description"
          content="Food Order & Delivery with Realtime Status Updates"
        />
        <meta name="theme-color" content="#2e7d32" />
        <meta name="CSRF" content={props.csrfToken} />
        <link rel="icon" href="/icons/maskable_icon_x48.png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <nav className={styles.sticky}>
        <div className={styles.navLayout}>
          <div className={styles.logoArea}>GeoFood</div>

          <div className={styles.searchArea}>
            <Search />
          </div>

          <div className={styles.cartArea}>
            <ul>
              <li>
                <Bag />
              </li>
              {/* <li><Menu /></li> */}
            </ul>
          </div>
        </div>
      </nav>
      <div className={styles.hero}>
        <Drone />
        <h1>Easy food Order & Delivery near you!</h1>
        <RequestPositionButton />
        {/* {JSON.stringify(props)} */}
      </div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Pick up your{' '}
          <Link href="/restaurants">
            <a>Restaurant!</a>
          </Link>
        </h1>

        <p className={styles.description}>
          Get started with our best recommendations
        </p>

        <div id="restaurants" className={styles.grid}>
          {props.restaurants.map((restaurant: Restaurant) => (
            <Link key={restaurant.id} href={`/restaurants/${restaurant.id}`}>
              <a className={styles.card}>
                <h2>{restaurant.name}</h2>
                <p>{restaurant.address}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://radu.at" target="_blank" rel="noopener noreferrer">
          Powered by radu.at
          {/* <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span> */}
        </a>
      </footer>
    </div>
  );
}

export function getServerSideProps(context: GetServerSidePropsContext) {
  // Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/`,
        permanent: true,
      },
    };
  }

  return {
    props: {
      csrfToken: createCsrfToken(),
    },
  };
}
