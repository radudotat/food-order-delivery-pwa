import Cookies from 'js-cookie';

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

export function setParsedCookie(key: string, value: ReservedProducts) {
  console.log('setParsedCookie', key, value);

  Cookies.set(key, JSON.stringify(value));
}

export function deleteCookie(key: string) {
  Cookies.remove(key);
}

export function stringifyCookieValue(value: ReservedProducts) {
  return JSON.stringify(value);
}
