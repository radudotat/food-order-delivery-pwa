import {MapPin} from "./icons";
import {setCookieLocation} from "../helpers/cookies";
import {watchGeolocation} from "../helpers/geolocation";

const requestGeolocation = async () => {
    const geolocation = navigator.geolocation.getCurrentPosition(location => {
        setCookieLocation(location);
    }, error => {
        console.error(error)
    }, {
        enableHighAccuracy: true,
        maximumAge: 15000,
        timeout: 12000
    })
    const locationState = watchGeolocation();

    return geolocation;
}

const RequestPositionButton = ({...props}) => {
    return (
        <button onClick={() => {
            requestGeolocation().catch(() => {
            });
        }}><MapPin/>Use current location
        </button>
    )
}

export default RequestPositionButton
