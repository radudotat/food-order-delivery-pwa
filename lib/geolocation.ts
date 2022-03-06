// import { useEffect, useState } from 'react';

export const watchGeolocation = () => {
  // const [state, setState] = useState({});
  const state: never[] = [];
  // let mounted = true;
  // let watchId: number;
  // const options: PositionOptions = {
  //   enableHighAccuracy: true,
  //   maximumAge: 15000,
  //   timeout: 12000,
  // };

  // const onLocationError = (error: GeolocationPositionError) => {
  //   console.error(error.message);
  // };

  // const onLocationChange = (event: GeolocationPosition) => {
  //   console.info('onLocationChange', event);
  //   // if (mounted) {
  //   //   setState({
  //   //     accuracy: event.coords.accuracy,
  //   //     altitude: event.coords.altitude,
  //   //     altitudeAccuracy: event.coords.altitudeAccuracy,
  //   //     heading: event.coords.heading,
  //   //     latitude: event.coords.latitude,
  //   //     longitude: event.coords.longitude,
  //   //     speed: event.coords.speed,
  //   //     timestamp: event.timestamp,
  //   //   });
  //   // }
  // };

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     onLocationChange,
  //     onLocationError,
  //     options,
  //   );
  //   watchId = navigator.geolocation.watchPosition(
  //     onLocationChange,
  //     onLocationError,
  //     options,
  //   );

  //   return () => {
  //     mounted = false;
  //     navigator.geolocation.clearWatch(watchId);
  //   };
  // }, []);

  return state;
};
