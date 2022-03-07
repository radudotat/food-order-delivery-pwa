import { scroller } from 'react-scroll';
import { fetchGetRestaurants } from '../lib/apollo';
import { setCookieLocation } from '../lib/cookies';
// import { watchGeolocation } from '../helpers/geolocation';
import { MapPin } from './icons';

const requestGeolocation = (props: any) => {
  scroller.scrollTo('restaurants', {
    duration: 1200,
    delay: 0,
    smooth: 'easeInOutQuart',
    // offset: offset,
  });
  const geolocation = navigator.geolocation.getCurrentPosition(
    (location) => {
      console.log(location.coords.latitude, location.coords.longitude);
      const getRestaurantsByLocationQuery = `
              query GetNearbyRestaurants {
                nearby_restaurants(args: {
                lat: "${location.coords.latitude}",
                lon: "${location.coords.longitude}",
                bound: 1000
                }, order_by: {
                distance: asc
                }, limit: 9, offset: 0) {
                  id
                  name
                  address
                  distance
                }
              }
`;
      console.log(getRestaurantsByLocationQuery, props);
      setCookieLocation(location);
      fetchGetRestaurants(getRestaurantsByLocationQuery)
        .then(({ data, errors }) => {
          if (errors) {
            console.error(errors);
          }
          console.log(data);
          props.setRestaurants(data.nearby_restaurants);
        })
        .catch((error) => {
          console.error(error);
        });
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

const RequestPositionButton = (props: any) => {
  return (
    <button
      onClick={() => {
        requestGeolocation(props);
      }}
    >
      <MapPin />
      Use current location
    </button>
  );
};

export default RequestPositionButton;
