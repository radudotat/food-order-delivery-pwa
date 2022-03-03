import bcrypt from 'bcryptjs';

const saltRounds = 12;

export function formatPrice(price: number) {
  return (price / 100).toFixed(2);
}

export function cloneLocation(location: GeolocationPosition) {
  return {
    timestamp: location.timestamp,
    coords: {
      accuracy: location.coords.accuracy,
      altitude: location.coords.altitude,
      altitudeAccuracy: location.coords.altitudeAccuracy,
      heading: location.coords.heading,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      speed: location.coords.speed,
    },
  };
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, saltRounds);
}
