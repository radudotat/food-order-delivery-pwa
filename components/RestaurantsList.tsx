import Image, { ImageLoaderProps } from 'next/image';
import Link from 'next/link';
import { Restaurant } from '../lib/types/restaurants';
import styles from '../styles/Home.module.css';

type Props = {
  restaurants: Restaurant[];
  imagesUrl: string;
};

export default function RestaurantsList(props: Props) {
  const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
    if (!props.imagesUrl) throw new Error('IMAGES API address not defined');

    return `${props.imagesUrl}/restaurants/1080/${src}?w=${width}&q=${
      quality || 75
    }`;
  };
  return (
    <div id="restaurants" className={styles.grid}>
      {props.restaurants.map((restaurant: Restaurant) => (
        <Link key={restaurant.id} href={`/restaurants/${restaurant.id}`}>
          <a className={styles.card}>
            <Image
              className="cover"
              loader={imageLoader}
              src={restaurant.cover}
              alt={`Cover photo of the ${restaurant.name}`}
              width={250}
              height={166}
              // layout="cover"
            />
            <h2>{restaurant.name}</h2>
            <p>{restaurant.address}</p>
            <p>{restaurant.distance ? `${restaurant.distance}m` : ''}</p>
          </a>
        </Link>
      ))}
    </div>
  );
}
