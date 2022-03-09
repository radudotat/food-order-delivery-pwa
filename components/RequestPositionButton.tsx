import {scroller} from 'react-scroll';
import {fetchGetRestaurants} from '../lib/apollo';
import {setCookieLocation} from '../lib/cookies';
// import { watchGeolocation } from '../helpers/geolocation';
import {MapPin} from './icons';

type Props = {
    refreshRestaurants: (param: string) => void;
};

const requestGeolocation = (props: Props) => {
    // console.log('requestGeolocation props', props)
    props.refreshRestaurants('byLocation');

    scroller.scrollTo('restaurants', {
        duration: 1200,
        delay: 0,
        smooth: 'easeInOutQuart',
        // offset: offset,
    });

    const geolocation = navigator.geolocation.getCurrentPosition(
        (location) => {
            // console.log('requestGeolocation', location.coords.latitude, location.coords.longitude);
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
                requestGeolocation(props);
            }}
        >
            <MapPin/>
            Use current location
            {/*={JSON.stringify(props)}=*/}
        </button>
    );
};

export default RequestPositionButton;
