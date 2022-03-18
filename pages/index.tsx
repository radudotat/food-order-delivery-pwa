import '../node_modules/leaflet/dist/leaflet.css';
import {GetServerSidePropsContext} from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image, {ImageLoaderProps} from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {Bag, Drone} from '../components/icons';
import Layout from '../components/Layout';
import RequestPositionButton from '../components/RequestPositionButton';
import Search from '../components/Search';
import UserMenu from '../components/UserMenu';
import {createCsrfToken} from '../lib/auth';
import {User} from '../lib/database';
import {Restaurant} from '../lib/types/restaurants';
import styles from '../styles/Home.module.css';

type Props = {
  refreshRestaurants: () => void;
  csrfToken: string;
  restaurants: any;
  imagesUrl: string;
  mapUrl: string;
  userObject: User;
};

export default function Home(props: Props) {
  const imageLoader = ({src, width, quality}: ImageLoaderProps) => {
    if (!props.imagesUrl) throw new Error('IMAGES API address not defined');

    return `${props.imagesUrl}/restaurants/1080/${src}?w=${width}&q=${
      quality || 75
    }`;
  };

  const [userId, setUserId] = useState<number>();

  function changeUserId(id: number) {
    setUserId(id);
  }

  const isLoggedIn: boolean = userId ? userId > 0 : false;

  // Avoid error if userId is undefined
  if (typeof userId === 'number') {
    const multipliedUserId = userId * 2;
    changeUserId(multipliedUserId);
  }

  const DynamicMap = dynamic(() => import('../components/Map'), {
    ssr: false,
  });

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const sw = navigator.serviceWorker;
      window.addEventListener('load', () => {
        sw.register('/sw.js')
          .then(() => sw.ready)
          .then(() => {
            sw.addEventListener('message', ({data}) => {
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
    <Layout csrfToken={props.csrfToken} userObject={props.userObject}>
      <div className={styles.container}>
        <Head children={null}/>
        <nav className={styles.sticky}>
          <div className={styles.navLayout}>
            <div className={styles.logoArea}>GeoFood</div>

            <div className={styles.searchArea}>
              <Search/>
            </div>

            <div className={styles.cartArea}>
              <ul>
                <li>
                  <Bag/>
                </li>
                {props.userObject ? (
                  <li>
                    <UserMenu isLoggedIn={isLoggedIn}/>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link href="/login">
                        <a>Login</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/register">
                        <a>Register</a>
                      </Link>
                    </li>
                  </>
                )}
                <li>

                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className={styles.hero}>
          <Drone/>
          <h1>Easy food Order & Delivery near you!</h1>
          <RequestPositionButton
            refreshRestaurants={props.refreshRestaurants}
          />
          {JSON.stringify(props.userObject)}
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
                    loader={imageLoader}
                    src={restaurant.cover}
                    alt={`Cover photo of the ${restaurant.name}`}
                    width={250}
                    height={166}
                    // layout="cover"
                  />
                  <h2>{restaurant.name}</h2>
                  <p>{restaurant.address}</p>
                  <p>{restaurant.distance}m</p>
                </a>
              </Link>
            ))}
          </div>
          <div className={styles.mapcontainer}>
            <DynamicMap restaurants={props.restaurants} mapUrl={props.mapUrl}/>
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
  const mapUrl: string | undefined = process.env.MAP_ENDPOINT;

  return {
    props: {
      imagesUrl: imagesUrl,
      csrfToken: createCsrfToken(),
      mapUrl: mapUrl,
    },
  };
}
