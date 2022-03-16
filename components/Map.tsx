import { Icon, LatLngBoundsExpression, LatLngExpression } from 'leaflet';
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
  const [markers, setMarkers] = useState<Restaurant[]>([]);
  const [position, setPosition] = useState<LatLngExpression>([
    48.206417, 16.372013,
  ]);
  const [coordinates, setCoordinates] = useState<LatLngBoundsExpression>([
    [48.200491, 16.350568],
    [48.21582, 16.396487],
  ]);
  const mapRef = useRef<any>(null);
  const onMapLoad = useCallback((map) => {
    // console.log('whenCreated onMapLoad', map);
    mapRef.current = map;
  }, []);

  if (!props.mapUrl) throw new Error('Map address not defined');

  const userIcon = new Icon({
    iconUrl: '/markers/current_location_map_pointer_small.png',
    iconRetinaUrl: '/markers/current_location_map_pointer_small.png',
    popupAnchor: [-0, -0],
    iconSize: [70, 62],
  });

  const restaurantIcon = new Icon({
    iconUrl: '/markers/restaurant_map_pointer_small.png',
    iconRetinaUrl: '/markers/restaurant_map_pointer_small.png',
    popupAnchor: [-0, -0],
    iconSize: [70, 62],
  });

  useLayoutEffect(() => {
    // console.log('useLayoutEffect')
    const restaurantsCoordinates: LatLngBoundsExpression =
      props.restaurants.map((restaurant) => [
        restaurant.location.coordinates[1],
        restaurant.location.coordinates[0],
      ]);

    setCoordinates(restaurantsCoordinates);

    setTimeout(() => {
      console.log('fitBounds', coordinates, mapRef);
      mapRef.current?.fitBounds(coordinates);
      setMarkers(props.restaurants);
    }, 500);
  }, [props.restaurants, coordinates]);

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
      <Marker position={position} icon={userIcon} />
      {markers.map((restaurant: Restaurant) => (
        // console.log('marker', restaurant.location.coordinates)
        <Marker
          key={restaurant.id}
          position={[
            restaurant.location.coordinates[1],
            restaurant.location.coordinates[0],
          ]}
          icon={restaurantIcon}
        >
          <Popup>
            <h2>{restaurant.name}</h2>
            <h3>{restaurant.address}</h3>
            <small>{restaurant.distance}m</small>
            {/* {JSON.stringify(restaurant)}*/}
          </Popup>
        </Marker>
      ))}
      {/* </LayersControl> */}
      {/* {JSON.stringify(props)}*/}
    </MapContainer>
  );
}
