import '../node_modules/leaflet/dist/leaflet.css';
import { GetServerSidePropsContext } from 'next';
// import { useContextualRouting } from 'next-use-contextual-routing';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { Drone } from '../components/icons';
import Layout from '../components/Layout';
import ModalAuth from '../components/modals/ModalAuth';
import RequestPositionButton from '../components/RequestPositionButton';
import RestaurantsList from '../components/RestaurantsList';
// import Search from '../components/Search';
// import UserMenu from '../components/UserMenu';
import { createCsrfToken } from '../lib/auth';
import { User } from '../lib/database';
import { Restaurant } from '../lib/types/restaurants';
import styles from '../styles/Home.module.css';

// import Login from './login';

type Props = {
  refreshRestaurants: () => void;
  csrfToken: string;
  restaurants: Restaurant[];
  imagesUrl: string;
  mapUrl: string;
  userObject: User;
};

export default function Home(props: Props) {
  const router = useRouter();
  // const pageState = router.query.state;
  // const { makeContextualHref, returnHref } = useContextualRouting();
  // const openModal = () =>
  //   router.push(
  //     makeContextualHref({ id: 0 }),
  //     '/login',
  //     {
  //       shallow: true,
  //     },
  //   );

  // const closeModal = () =>
  //   router.push(returnHref, undefined, { shallow: true });

  const [userId, setUserId] = useState<number>();

  function changeUserId(id: number) {
    setUserId(id);
  }

  // const isLoggedIn: boolean = userId ? userId > 0 : false;

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
    <Layout csrfToken={props.csrfToken} userObject={props.userObject}>
      <div className={styles.container}>
        <Head children={null} />

        <div className={styles.hero}>
          <Drone />
          <h1>Easy food Order & Delivery near you!</h1>
          <RequestPositionButton
            refreshRestaurants={props.refreshRestaurants}
          />
          {/* {JSON.stringify(props.userObject)} */}
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
          <RestaurantsList
            restaurants={props.restaurants}
            // refreshRestaurants={props.refreshRestaurants}
            // csrfToken={props.csrfToken}
            imagesUrl={props.imagesUrl}
          />
          <div className={styles.mapcontainer}>
            <DynamicMap restaurants={props.restaurants} mapUrl={props.mapUrl} />
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
      <Modal
        center
        blockScroll={true}
        open={!!router.query.login}
        onClose={() => router.push('/', undefined, { shallow: true })}
      >
        <ModalAuth isShown={true} />
      </Modal>
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
