import {Bounds, BoundsExpression, Icon, LatLngBoundsExpression} from 'leaflet';
import {MapContainer, MapContainerProps, Marker, Popup, useMap} from 'react-leaflet';
import VectorTileLayer from 'react-leaflet-vector-tile-layer';
import styles from '../styles/Home.module.css';
import {Restaurant} from "../lib/types/restaurants";
import {useCallback, useLayoutEffect, useRef, useState} from "react";

type Props = {
    mapUrl: string;
    restaurants: Restaurant[]
};

export default function Map(props: Props) {
    let position: any = [48.206417, 16.372013];
    const [markers, setMarkers] = useState<Restaurant[]>([]);
    const [coordinates, setCoordinates] = useState<LatLngBoundsExpression>([[48.200491, 16.350568], [48.215820, 16.396487]]);
    const mapRef = useRef<any>(null);
    const onMapLoad = useCallback((map) => {
        // console.log('whenCreated onMapLoad', map);
        mapRef.current = map;
    }, []);

    if (!props.mapUrl) throw new Error('Map address not defined');

    const myIcon = new Icon({
        iconUrl: '/marker-icon.png',
        iconRetinaUrl: '/marker-icon.png',
        popupAnchor: [-0, -0],
        iconSize: [32, 45],
    });

    useLayoutEffect(() => {
        const [...coordinates] = props.restaurants.map(restaurant => [
            restaurant.location.coordinates[1],
            restaurant.location.coordinates[0]
        ]);

        setTimeout(() => {
            console.log('fitBounds', coordinates, mapRef)
            mapRef.current?.fitBounds(coordinates);
            setMarkers(props.restaurants);
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
            <VectorTileLayer styleUrl={props.mapUrl}/>
            {markers.map((restaurant: Restaurant) => (
                // console.log('marker', restaurant.location.coordinates)
                <Marker key={restaurant.id}
                        position={[restaurant.location.coordinates[1], restaurant.location.coordinates[0]]}
                        icon={myIcon}>
                    <Popup>
                        <h2>{restaurant.name}</h2>
                        <h3>{restaurant.address}</h3>
                        <small>{restaurant.distance}m</small>
                        {/*{JSON.stringify(restaurant)}*/}
                    </Popup>
                </Marker>
            ))}
            {/* </LayersControl> */}
            {/*{JSON.stringify(props)}*/}
        </MapContainer>
    );
}
