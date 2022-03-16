import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Image, { ImageLoaderProps } from 'next/image';
import { useRouter } from 'next/router';
// import Head from 'next/head';
// import Image from 'next/image';
// import Layout from '../../components/Layout';
// import { formatPrice } from '../../lib/helpers';
import { getRestaurantById } from '../../lib/restaurants';
import { Restaurant } from '../../lib/types/restaurants';
import styles from '../../styles/Home.module.css';

type Props = {
  restaurant: Restaurant;
  imagesUrl: string;
};

export default function SingleRestaurant(props: Props) {
  const router = useRouter();
  const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
    if (!props.imagesUrl) throw new Error('IMAGES API address not defined');

    return `${props.imagesUrl}/restaurants/1080/${src}?w=${width}&q=${
      quality || 75
    }`;
  };
  // console.log('SingleRestaurant', props);
  return (
    <>
      {/* <p>{JSON.stringify(props)}</p>*/}
      <div className={styles.restaurantCover}>
        <Image
          className={styles.cover}
          loader={imageLoader}
          src={props.restaurant.cover}
          alt={`Cover photo of the ${props.restaurant.name}`}
          width={250}
          height={166}
          layout="responsive"
        />
      </div>
      <div>
        <h3>{props.restaurant.name}</h3>
        <address>{props.restaurant.address}</address>
        <p>{props.restaurant.distance}</p>
        <button onClick={() => router.back()}>Back</button>
      </div>
    </>
  );
}

// The parameter `context` gets passed from Next.js
// and includes a bunch of information about the
// request
export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<
  GetServerSidePropsResult<{ restaurant?: Restaurant; imagesUrl?: string }>
> {
  // This is the variable that we get from the URL
  // (anything after the slash)
  const restaurantId = context.query.restaurantId;

  if (!restaurantId || Array.isArray(restaurantId)) {
    return { props: {} };
  }

  const response = await getRestaurantById(parseInt(restaurantId));
  const restaurant = response.response?.data?.restaurants[0];
  console.log('restaurant', restaurant.id, context.query);

  const imagesUrl: string | undefined = process.env.IMAGES_ENDPOINT;
  if (!imagesUrl) throw new Error('IMAGES API address not defined');

  return {
    props: {
      imagesUrl: imagesUrl,
      restaurant: restaurant,
    },
  };
}
