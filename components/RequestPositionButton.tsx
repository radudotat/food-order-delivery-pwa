import { scroller } from 'react-scroll';
// import { fetchGetRestaurants } from '../lib/apollo';
import { setCookieLocation } from '../lib/cookies';
// import { watchGeolocation } from '../helpers/geolocation';
import { MapPin } from './icons';

type Props = {
  refreshRestaurants: (param: GeolocationPosition | string) => void;
};

const requestGeolocation = (callRefreshRestaurants: {
  (param: string): void;
  (arg0: GeolocationPosition | string): void;
}) => {
  scroller.scrollTo('restaurants', {
    duration: 1200,
    delay: 0,
    smooth: 'easeInOutQuart',
    // offset: offset,
  });

  const geolocation = navigator.geolocation.getCurrentPosition(
    (location) => {
      // console.log('requestGeolocation', location.coords.latitude, location.coords.longitude);
      setCookieLocation(location);
      callRefreshRestaurants(location);

      return location;
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

const RequestPositionButton = (props: Props) => {
  return (
    <button
      onClick={() => {
        requestGeolocation(props.refreshRestaurants);
      }}
    >
      <MapPin />
      Use current location
      {/* ={JSON.stringify(props)}=*/}
    </button>
  );
};

export default RequestPositionButton;
