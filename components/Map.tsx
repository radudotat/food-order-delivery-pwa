import { Icon } from 'leaflet';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup } from 'react-leaflet';
import VectorTileLayer from 'react-leaflet-vector-tile-layer';
import { Restaurant } from '../lib/types/restaurants';
import styles from '../styles/Home.module.css';

type Props = {
  mapUrl: string;
  restaurants: Restaurant[];
};

export default function Map(props: Props) {
  const position: any = [48.206417, 16.372013];
  const [markers, setMarkers] = useState<Restaurant[]>([]);
  const mapRef = useRef<any>(null);
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (!props.mapUrl) throw new Error('Map address not defined');

  const myIcon = new Icon({
    iconUrl: '/marker-icon.png',
    iconRetinaUrl: '/marker-icon.png',
    popupAnchor: [-0, -0],
    iconSize: [25, 41],
  });

  useLayoutEffect(() => {
    const [...coordinates] = props.restaurants.map((restaurant) => [
      restaurant.location.coordinates[1],
      restaurant.location.coordinates[0],
    ]);

    setTimeout(() => {
      // console.log('fitBounds', coordinates, mapRef)
      setMarkers(props.restaurants);

      if (coordinates.length > 0) {
        mapRef.current?.fitBounds(coordinates);
      }
    }, 500);
  }, [props.restaurants]);

  return (
    <MapContainer
      whenCreated={onMapLoad}
      className={styles.map}
      scrollWheelZoom={false}
      center={position}
      zoom={14}
      pitch={60}
      bearing={0}
    >
      {/* <LayersControl position="topright"> */}
      <VectorTileLayer styleUrl={props.mapUrl} />
      {markers.map((restaurant: Restaurant) => (
        // console.log('marker', restaurant.location.coordinates)
        <Marker
          key={restaurant.id}
          position={[
            restaurant.location.coordinates[1],
            restaurant.location.coordinates[0],
          ]}
          icon={myIcon}
        >
          <Popup>
            <h2>{restaurant.name}</h2>
            <h3>{restaurant.address}</h3>
            {/* {JSON.stringify(restaurant)}*/}
          </Popup>
        </Marker>
      ))}
      {/* </LayersControl> */}
      {/* {JSON.stringify(props)}*/}
    </MapContainer>
  );
}
