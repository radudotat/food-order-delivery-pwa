import Head from 'next/head';
import React from 'react';
import Header from './Header';

type Props = {
  csrfToken: string;
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
        <link rel="icon" href="/icons/maskable_icon_x48.png" />
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

      <Header />

      <main>{props.children}</main>
    </>
  );
}
