import { serialize } from 'cookie';
import Cookies from 'js-cookie';
import { cloneLocation } from './helpers';

export function getParsedCookie(key: string) {
  const cookieValue = Cookies.get(key); // Type is string | undefined

  // console.log('~~~~~~~~~~~~~~~~~~~~~~getParsedCookie', key, cookieValue);
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
  // console.log('setParsedCookie', key, value);
  // make sure your cookies don't expire
  const expiration = new Date('01/01/2100');

  Cookies.set(key, JSON.stringify(value), {
    path: '/',
    expires: expiration,
    SameSite: 'Strict',
  });
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

export function getCookieSession() {
  const cookieValue = Cookies.get('sessionToken');
  // console.log('------------------------getCookieSession', cookieValue);
  return cookieValue;
}

export function setCookieLocation(location: GeolocationPosition) {
  const storedLocation = getCookieLocation();
  // console.log('storedLocation', storedLocation);
  if (
    !location.timestamp &&
    storedLocation.timestamp &&
    storedLocation.timestamp === location.timestamp
  ) {
    return;
  }

  const userLocation = cloneLocation(location);
  // console.log('setCookieLocation', location, userLocation);
  setParsedCookie('userLocation', userLocation);
}

export function createSessionTokenCookie(token: string) {
  Cookies.set('isLoggedIn', 'true');
  // check if we are in production e.g. Heroku
  const isProduction = process.env.NODE_ENV === 'production';

  const maxAge = 60 * 60 * 24; // 24 hours

  return serialize('sessionToken', token, {
    maxAge: maxAge,

    expires: new Date(Date.now() + maxAge * 1000),

    // Important for security
    httpOnly: true,
    // Important for security
    // Set secure cookies on production (eg. Heroku)
    secure: isProduction,
    path: '/',
    // Be explicit about new default behavior
    // in browsers
    // https://web.dev/samesite-cookies-explained/
    sameSite: 'strict',
  });
}
