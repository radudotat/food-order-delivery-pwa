import {GetServerSidePropsContext, GetServerSidePropsResult} from 'next';
import Head from 'next/head';
import {getRestaurantById} from '../../lib/restaurants';
// import Image from 'next/image';
// import Layout from '../../components/Layout';
import {formatPrice} from '../../lib/helpers';
import {Restaurant} from '../../lib/types/restaurants';

type Props = {
    restaurant: Restaurant;
};

export default function SingleRestaurant(props: Props) {
    // console.log('SingleRestaurant', props);
    return (
        <>
            <p>{JSON.stringify(props)}</p>
            {/* <Image
        src={`/restaurants/${props.restaurant.id}.jpg`}
        width="300"
        height="300"
      /> */}
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
        return {props: {}};
    }

    const response = await getRestaurantById(parseInt(restaurantId));
    const restaurant = response?.response?.data?.restaurants[0]
    console.log('restaurant', restaurant.id, context.query);

    return {
        notFound: true, redirect: undefined,
        props: {
            restaurant: restaurant
        }
    };
}
