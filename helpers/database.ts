import camelcaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';
import setPostgresDefaultsOnHeroku from './herokuDefaults';

setPostgresDefaultsOnHeroku();
// Read the environment variables from the .env
// file, which will then be available for all
// following code
config({
  allowEmptyValues: true,
});

// Type needed for the connection function below
declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

export type Product = {
  id: number;
  menuId: number;
  categoryId: number;
  name: string;
  price: number;
};

export type ProductsList = [];

export type Restaurant = {
  id: number;
  menuId: number;
  categoryId: number;
  name: string;
  price: number;
};

export type RestaurantsList = [];

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    // When in development, connect only once to the database
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }

    sql = globalThis.postgresSqlClient;
  }
  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

console.log('db file');

export async function getProducts() {
  const products = await sql<Product[]>`
    SELECT * FROM products;
  `;

  return products.map((product) => camelcaseKeys(product));
}

export async function getProductById(id: number) {
  const [product] = await sql<Product[]>`
    SELECT * FROM products WHERE id = ${id};
  `;

  return camelcaseKeys(product);
}

export async function getRestaurants() {
  const restaurants = await sql<Restaurant[]>`
    SELECT * FROM restaurants;
  `;

  return restaurants.map((restaurant) => camelcaseKeys(restaurant));
}

export async function getRestaurantById(id: number) {
  const [restaurant] = await sql<Restaurant[]>`
    SELECT * FROM products WHERE id = ${id};
  `;

  return camelcaseKeys(restaurant);
}
