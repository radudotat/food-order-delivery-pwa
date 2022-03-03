import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BiCart } from 'react-icons/bi';
import {
  getParsedCookie,
  ReservedRestaurants,
  setParsedCookie,
} from './helpers/cookies';
import {
  getRestaurants,
  Restaurant,
  RestaurantsList,
} from './helpers/database';
import { formatPrice } from './helpers/helpers';
// import Layout from '../components/Layout';
import PizzaIso from './public/svg/pizza-iso.svg';
import styles from './styles/Home.module.css';

type Props = {
  // Restaurant: Restaurant;
  Restaurants: RestaurantsList;
  reservedRestaurants: ReservedRestaurants;
};

// const RestaurantStyles = css`
//   border-radius: 5px;
//   border: 1px solid #ccc;
//   padding: 15px;
//   margin-bottom: 20px;
// `;

const restaurantStyles = css`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-around;
  align-items: center;
`;

const restaurantsStyles = css`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-around;
  align-items: center;
`;

const restaurantNameStyles = css`
  text-transform: capitalize;
  font-size: 120%;
  font-weight: 700;
`;

const restaurantLinkStyles = css`
  text-align: center;
  cursor: pointer;
`;

const operation = `
  query GetRestaurants {
    total: restaurants_aggregate(where: {address: {_neq: ""}, _and: {_and: {id: {_gt: 10}}}}) {
      aggregate {
        totalCount: count
      }
    }
    restaurants(limit: 9, where: {address: {_neq: ""}, _and: {_and: {id: {_gt: 10}}}}, order_by: {name: asc}) {
      id
      name
      address
      amenity
    }
  }
`;

async function fetchGetRestaurants(op: string) {
  return await fetch('http://localhost:8084/v1/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query: op,
    }),
  })
    .then((result) => result.json())
    .catch(console.error);
}

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
  const [restaurantsArray, setRestaurantsArray] = useState(
    props.reservedRestaurants,
  );

  function addRestaurantToCart(id: number) {
    console.log('addRestaurantToCart', id, restaurantsArray);
    // 1. get the value of the cookie
    const cookieValue = getParsedCookie('reservedRestaurants') || [];

    // 2. update the cooke
    const existIdOnArray = cookieValue.some((cookieObject: { id: number }) => {
      return cookieObject.id === id;
    });

    let newCookie;
    if (existIdOnArray) {
      //  CASE = when the id is in the array => delete item
      //  cookieValue  [{id:3},{id:5} ]
      newCookie = cookieValue.filter((cookieObject: { id: number }) => {
        return cookieObject.id === id;
      });

      console.log('existIdOnArray Cookie', id, newCookie);
      newCookie[0].quantity += 1;
      const newQuantity = newCookie[0].quantity;

      newCookie = [...cookieValue, { id: id, quantity: newQuantity }];
    } else {
      //  CASE = when the id is not in the array => add item
      //  cookieValue  [{id:3, quantity: 5 },{id:5, quantity: 12 }]
      newCookie = [...cookieValue, { id: id, quantity: 1 }];
    }

    // 3. set the new value of the cookie
    setRestaurantsArray(newCookie);
    setParsedCookie('reservedRestaurants', newCookie);
    /* console.log('RestaurantsArray, RestaurantsArray'); */
  }

  return (
    <>
      <Head>
        <title>Restaurants</title>
        <meta name="description" content="Our shop Restaurants" />
      </Head>

      <h1 className={styles.title}>Restaurants</h1>
      <div css={restaurantsStyles}>
        {props.Restaurants.map((Restaurant: Restaurant) => {
          return (
            <div key={`Restaurant-${Restaurant.id}`} css={restaurantStyles}>
              <Link href={`/Restaurants/${Restaurant.id}`}>
                <a css={restaurantLinkStyles}>
                  <div css={restaurantNameStyles}>{Restaurant.name}</div>
                  <Image src={PizzaIso} />
                </a>
              </Link>
              <button onClick={() => addRestaurantToCart(Restaurant.id)}>
                €{formatPrice(Restaurant.price)}
                <BiCart height="40" />
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const RestaurantsList = await getRestaurants();

  return {
    props: {
      // In the props object, you can pass back
      // whatever information you want
      Restaurants: RestaurantsList,
    },
  };
}
