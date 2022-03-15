import Cookies from 'js-cookie';
import { cloneLocation } from './helpers';

export function getParsedCookie(key: string) {
  const cookieValue = Cookies.get(key); // Type is string | undefined

  console.log('getParsedCookie', key, cookieValue);
  // Narrowing
  if (!cookieValue) {
    return undefined;
  }

  try {
    return JSON.parse(cookieValue); // Type is string
  } catch (err) {
    return undefined;
  }
}

type ReservedProduct = { id: string; price: number };
export type ReservedProducts = ReservedProduct[];

type ReservedRestaurant = { id: string; price: number };
export type ReservedRestaurants = ReservedRestaurant[];

// type Location = { id: string; price: number };
// export type Location = ReservedRestaurant[];

export function setParsedCookie(key: string, value: any) {
  console.log('setParsedCookie', key, value);
  // make sure your cookies don't expire
  const expiration = new Date('01/01/2100');

  Cookies.set(key, JSON.stringify(value), { path: '/', expires: expiration, SameSite: 'Strict' });
}

export function deleteCookie(key: string) {
  Cookies.remove(key);
}

export function stringifyCookieValue(value: ReservedProducts) {
  return JSON.stringify(value);
}

export function getCookieLocation() {
  return getParsedCookie('userLocation');
}

export function setCookieLocation(location: GeolocationPosition) {
  const storedLocation = getCookieLocation();
  console.log('storedLocation', storedLocation);
  if (
    !location.timestamp &&
    storedLocation.timestamp &&
    storedLocation.timestamp === location.timestamp
  ) {
    return;
  }

  const userLocation = cloneLocation(location);
  console.log('setCookieLocation', location, userLocation);
  setParsedCookie('userLocation', userLocation);
}
