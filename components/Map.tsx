import { Icon, LatLngExpression } from 'leaflet';
import { MapContainer, Marker, Popup } from 'react-leaflet';
import VectorTileLayer from 'react-leaflet-vector-tile-layer';
import styles from '../styles/Home.module.css';

type Props = {
  mapUrl: string;
};

export default function Map(props: Props) {
  const position: LatLngExpression = [48.206417, 16.372013];

  if (!props.mapUrl) throw new Error('Map address not defined');

  const myIcon = new Icon({
    iconUrl: '/marker-icon.png',
    iconRetinaUrl: '/marker-icon.png',
    popupAnchor: [-0, -0],
    iconSize: [32, 45],
  });

  return (
    <MapContainer
      className={styles.map}
      scrollWheelZoom={false}
      center={position}
      zoom={14}
      pitch={60}
      bearing={0}
    >
      {/* <LayersControl position="topright"> */}
      <VectorTileLayer styleUrl={props.mapUrl} />
      <Marker position={position} icon={myIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      {/* </LayersControl> */}
    </MapContainer>
  );
}
