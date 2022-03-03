import { setCookieLocation } from '../helpers/cookies';
// import { watchGeolocation } from '../helpers/geolocation';
import { MapPin } from './icons';

const requestGeolocation = () => {
  const geolocation = navigator.geolocation.getCurrentPosition(
    (location) => {
      setCookieLocation(location);
    },
    (error) => {
      console.error(error);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 15000,
      timeout: 12000,
    },
  );
  // const locationState = watchGeolocation();

  return geolocation;
};

const RequestPositionButton = () => {
  return (
    <button
      onClick={() => {
        requestGeolocation();
      }}
    >
      <MapPin />
      Use current location
    </button>
  );
};

export default RequestPositionButton;
