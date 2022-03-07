import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import { getRestaurantById, Restaurant } from '../../lib/database';
// import Image from 'next/image';
// import Layout from '../../components/Layout';
import { formatPrice } from '../../lib/helpers';

type Props = {
  restaurant: Restaurant;
};

export default function SingleRestaurant(props: Props) {
  // console.log('SingleRestaurant', props);
  return (
    <>
      <Head>
        <title>
          {props.restaurant.name} ({props.restaurant.price})
        </title>
        <meta
          name="description"
          content={`${props.restaurant.name} is a €${formatPrice(
            props.restaurant.price,
          )}`}
        />
      </Head>
      <h1>
        {props.restaurant.name} (€{formatPrice(props.restaurant.price)})
      </h1>
      <p>{JSON.stringify(props)}</p>
      {/* <Image
        src={`/restaurants/${props.restaurant.id}.jpg`}
        width="300"
        height="300"
      /> */}
      <div>id: {props.restaurant.id}</div>
      <div>Name: {props.restaurant.name}</div>
      <div>Price: €{formatPrice(props.restaurant.price)}</div>
    </>
  );
}

// The parameter `context` gets passed from Next.js
// and includes a bunch of information about the
// request
export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{ restaurant?: Restaurant }>> {
  // This is the variable that we get from the URL
  // (anything after the slash)
  const restaurantId = context.query.restaurantId;

  if (!restaurantId || Array.isArray(restaurantId)) {
    return { props: {} };
  }

  const restaurant = await getRestaurantById(parseInt(restaurantId));
  // console.log('restaurant', restaurant, context.query);

  return {
    props: {
      restaurant: restaurant,
      // restaurantId: restaurantId,
    },
  };
}
