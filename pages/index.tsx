// import type { NextPage } from 'next';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image, { ImageLoaderProps } from 'next/image';
import Link from 'next/link';
// import Image from 'next/image'
import { useEffect } from 'react';
import { Bag, Drone } from '../components/icons';
import Layout from '../components/Layout';
import RequestPositionButton from '../components/RequestPositionButton';
import Search from '../components/Search';
// import { fetchGetRestaurants, getRestaurantsQuery } from '../lib/apollo';
import { createCsrfToken } from '../lib/auth';
import { Restaurant } from '../lib/types/restaurants';
// import { watchGeolocation } from '../helpers/geolocation';
import styles from '../styles/Home.module.css';

// import {DocumentNode, gql, useQuery} from '@apollo/client'
// import {graphql} from 'graphql'

type Props = {
  refreshRestaurants: () => void;
  csrfToken: string;
  // client: any;
  restaurants: any;
  imagesUrl: string;
};

export default function Home(props: Props) {
  const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
    if (!props.imagesUrl) throw new Error('IMAGES API address not defined');

    return `${props.imagesUrl}/restaurants/1080/${src}?w=${width}&q=${
      quality || 75
    }`;
  };

  useEffect(() => {
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
    <Layout csrfToken={props.csrfToken}>
      <div className={styles.container}>
        <Head children={null} />
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
          <RequestPositionButton
            refreshRestaurants={props.refreshRestaurants}
          />
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
                  <Image
                    className="cover"
                    loader={myLoader}
                    src={restaurant.cover}
                    alt={`Cover photo of the ${restaurant.name}`}
                    width={500}
                    height={500}
                    // layout="cover"
                  />
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
    </Layout>
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

  const imagesUrl: string | undefined = process.env.IMAGES_ENDPOINT;

  return {
    props: {
      imagesUrl: imagesUrl,
      csrfToken: createCsrfToken(),
    },
  };
}
