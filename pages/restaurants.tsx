// import { css } from '@emotion/react';
import Head from 'next/head';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useState } from 'react';
import Layout from '../components/Layout';
import RestaurantsList from '../components/RestaurantsList';
// import { BiCart } from 'react-icons/bi';
// import { MapPin } from '../components/icons';
import { fetchGetRestaurants, operation } from '../lib/apollo';
// import {
//   getParsedCookie,
//   ReservedRestaurants,
//   setParsedCookie,
// } from '../lib/cookies';
import { getRestaurants, User } from '../lib/database';
// import { formatPrice } from '../lib/helpers';
import { Restaurant } from '../lib/types/restaurants';
// import Layout from '../components/Layout';
// import PizzaIso from '../public/svg/pizza-iso.svg';
import styles from '../styles/Home.module.css';

type Props = {
  //   setRestaurants: () => void;
  restaurants: Restaurant[];
  // refreshRestaurants: () => void;
  // reservedRestaurants: ReservedRestaurants;
  csrfToken: string;
  userObject: User;
  imagesUrl: string;
};

// const RestaurantStyles = css`
//   border-radius: 5px;
//   border: 1px solid #ccc;
//   padding: 15px;
//   margin-bottom: 20px;
// `;

// const restaurantStyles = css`
//   border-radius: 5px;
//   display: flex;
//   flex-direction: column;
//   align-content: center;
//   justify-content: space-around;
//   align-items: center;
// `;

// const restaurantsStyles = css`
//   display: flex;
//   flex-direction: row;
//   align-content: center;
//   justify-content: space-around;
//   align-items: center;
// `;

// const restaurantNameStyles = css`
//   text-transform: capitalize;
//   font-size: 120%;
//   font-weight: 700;
// `;

// const restaurantLinkStyles = css`
//   text-align: center;
//   cursor: pointer;
// `;

// const restaurantsTileStyles = css`
//   margin: 1.5em;
// `;

const restaurants = async () => {
  await fetchGetRestaurants(operation)
    .then(({ data, errors }) => {
      if (errors) {
        console.error(errors);
      }
      console.log(data);
    })
    .catch(console.error);
};

console.log(restaurants);

export default function Restaurants(props: Props) {
  // const [restaurantsArray, setRestaurantsArray] = useState(
  //   props.reservedRestaurants,
  // );

  // function addRestaurantToCart(id: number) {
  //   console.log('addRestaurantToCart', id, restaurantsArray);
  //   // 1. get the value of the cookie
  //   const cookieValue = getParsedCookie('reservedRestaurants') || [];

  //   // 2. update the cooke
  //   const existIdOnArray = cookieValue.some((cookieObject: { id: number }) => {
  //     return cookieObject.id === id;
  //   });

  //   let newCookie;
  //   if (existIdOnArray) {
  //     //  CASE = when the id is in the array => delete item
  //     //  cookieValue  [{id:3},{id:5} ]
  //     newCookie = cookieValue.filter((cookieObject: { id: number }) => {
  //       return cookieObject.id === id;
  //     });

  //     console.log('existIdOnArray Cookie', id, newCookie);
  //     newCookie[0].quantity += 1;
  //     const newQuantity = newCookie[0].quantity;

  //     newCookie = [...cookieValue, { id: id, quantity: newQuantity }];
  //   } else {
  //     //  CASE = when the id is not in the array => add item
  //     //  cookieValue  [{id:3, quantity: 5 },{id:5, quantity: 12 }]
  //     newCookie = [...cookieValue, { id: id, quantity: 1 }];
  //   }

  //   // 3. set the new value of the cookie
  //   setRestaurantsArray(newCookie);
  //   setParsedCookie('reservedRestaurants', newCookie);
  //   /* console.log('RestaurantsArray, RestaurantsArray'); */
  // }

  return (
    <Layout csrfToken={props.csrfToken} userObject={props.userObject}>
      <Head>
        <title>Restaurants</title>
        <meta name="description" content="Our shop Restaurants" />
      </Head>
      <div className={styles.innerPage}>
        <h1 className={styles.title}>Restaurants</h1>
        <RestaurantsList
          restaurants={props.restaurants}
          imagesUrl={props.imagesUrl}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const responseRestaurantsList = await getRestaurants();
  console.log('-----------RestaurantsList', responseRestaurantsList);
  const imagesUrl: string | undefined = process.env.IMAGES_ENDPOINT;

  return {
    props: {
      // In the props object, you can pass back
      // whatever information you want
      Restaurants: responseRestaurantsList,
      imagesUrl: imagesUrl,
    },
  };
}
