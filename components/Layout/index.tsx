import React from 'react';
import Head from 'next/head';
import Header from "./Header";

type Props = {
    csrfToken: string
    children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
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
            </Head>

            <Header/>

            <main>{props.children}</main>

        </>
    );
}
