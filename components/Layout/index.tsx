import Head from 'next/head';
import React from 'react';
import {User} from '../../lib/database';
import Header from './Header';
import styles from '../../styles/Home.module.css';
import Search from '../Search';
import {Bag} from '../icons';
import UserMenu from '../UserMenu';
import Link from 'next/link';

type Props = {
  sessionToken?: string;
  csrfToken?: string;
  userObject?: User;
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
};

export default function Layout(props: Props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/icons/maskable_icon_x48.png"/>
        <link rel="manifest" href="/manifest.json"/>
        <title>Food Ordering App</title>
        <meta
          name="description"
          content="Food Order & Delivery with Realtime Status Updates"
        />
        <meta name="theme-color" content="#2e7d32"/>
        <meta name="CSRF" content={props.csrfToken}/>
        <link rel="icon" href="/icons/maskable_icon_x48.png"/>
        <link rel="apple-touch-icon" href="/icon-192.png"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self' *.radu.at; script-src 'self' 'unsafe-eval' *.radu.at; img-src 'self' data: *.radu.at; style-src 'self' 'unsafe-inline'; worker-src blob: 'self'"
        />
        <meta
          httpEquiv="X-Content-Security-Policy"
          content="default-src 'self' *.radu.at; script-src 'self' 'unsafe-eval' *.radu.at; img-src 'self' data: *.radu.at; style-src 'self' 'unsafe-inline'; worker-src blob: 'self'"
        />
        <meta
          httpEquiv="X-WebKit-CSP"
          content="default-src 'self' *.radu.at; script-src 'self' 'unsafe-eval' *.radu.at; img-src 'self' data: *.radu.at; style-src 'self' 'unsafe-inline'; worker-src blob: 'self'"
        />
      </Head>

      <Header userObject={props.userObject}/>

      <nav className={styles.sticky}>
        <div className={styles.navLayout}>
          <Link href="/">
            <a className={styles.logoArea}> GeoFood</a>
          </Link>
          <div className={styles.searchArea}>
            <Search/>
          </div>

          <div className={styles.cartArea}>
            <ul>
              <li>
                <Bag/>
              </li>
              <UserMenu sessionToken={props.sessionToken} userObject={props.userObject}/>
            </ul>
          </div>
        </div>
      </nav>
      <main>{props.children}</main>
    </>
  );
}
