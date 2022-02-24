import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Bag, Drone, MapPin, Menu } from '../components/icons'
import styles from '../styles/Home.module.css'

import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

type currentColor = {
  currentColor: string;
};

type Props = { currentColor: currentColor };

const currentColor = "#ffffff";

export async function getStaticProps({
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }


  return {
    props: {
      currentColor,
    },
    revalidate: 60,
  }
}

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Food Ordering App</title>
        <meta name="description" content="Food Order & Delivery with Realtime Status Updates" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className={styles.sticky}>
        <div className={styles.navLayout}>
          <div className={styles.logoArea}>GeoFood</div>

          <div className={styles.searchArea}>
            <div className={styles.searchForm}>
              <input name="q" />
            </div>
          </div>

          <div className={styles.cartArea}>
            <ul>
              <li><Bag /></li>
              <li><Menu /></li>
            </ul>
          </div>
        </div>

      </nav>
      <div className={styles.hero}>
        <Drone />
        <h1>Easy food Order & Delivery near to you!</h1>
        <button><MapPin className="w-5 flex" />Use current location</button>
      </div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Pick up your <a href="https://nextjs.org">Restaurant!</a>
        </h1>

        <p className={styles.description}>
          Get started with our best recomandations
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://radu.at"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}radu.at
          {/* <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span> */}
        </a>
      </footer>
    </div>
  )
}

export default Home
