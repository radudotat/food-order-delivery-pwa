import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BiCart } from 'react-icons/bi';
// import Layout from '../components/Layout';
import PizzaIso from '../public/svg/pizza-iso.svg';
import styles from '../styles/Home.module.css';
import {
  getParsedCookie,
  ReservedProducts,
  setParsedCookie,
} from './helpers/cookies';
import { getProducts, Product, ProductsList } from './helpers/database';
import formatPrice from './helpers/helpers';

type Props = {
  // product: Product;
  products: ProductsList;
  reservedProducts: ReservedProducts;
};

// const productStyles = css`
//   border-radius: 5px;
//   border: 1px solid #ccc;
//   padding: 15px;
//   margin-bottom: 20px;
// `;

const productStyles = css`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-around;
  align-items: center;
`;

const productsStyles = css`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-around;
  align-items: center;
`;

const productNameStyles = css`
  text-transform: capitalize;
  font-size: 120%;
  font-weight: 700;
`;

const productLinkStyles = css`
  text-align: center;
  cursor: pointer;
`;

export default function Products(props: Props) {
  const [productsArray, setProductsArray] = useState(props.reservedProducts);

  function addProductToCart(id: number) {
    console.log('addProductToCart', id, productsArray);
    // 1. get the value of the cookie
    const cookieValue = getParsedCookie('reservedProducts') || [];

    // 2. update the cooke
    const existIdOnArray = cookieValue.some((cookieObject: { id: number }) => {
      return cookieObject.id === id;
    });

    let newCookie;
    if (existIdOnArray) {
      //  CASE = when the id is in the array => delete item
      //  cookieValue  [{id:3},{id:5} ]
      newCookie = cookieValue.filter((cookieObject: { id: number }) => {
        return cookieObject.id === id;
      });

      console.log('existIdOnArray Cookie', id, newCookie);
      newCookie[0].quantity += 1;
      const newQuantity = newCookie[0].quantity;

      newCookie = [...cookieValue, { id: id, quantity: newQuantity }];
    } else {
      //  CASE = when the id is not in the array => add item
      //  cookieValue  [{id:3, quantity: 5 },{id:5, quantity: 12 }]
      newCookie = [...cookieValue, { id: id, quantity: 1 }];
    }

    // 3. set the new value of the cookie
    setProductsArray(newCookie);
    setParsedCookie('reservedProducts', newCookie);
    /* console.log('productsArray, productsArray'); */
  }

  return (
    <>
      <Head>
        <title>Products</title>
        <meta name="description" content="Our shop Products" />
      </Head>

      <h1 className={styles.title}>Products</h1>
      <div css={productsStyles}>
        {props.products.map((product: Product) => {
          return (
            <div key={`product-${product.id}`} css={productStyles}>
              <Link href={`/products/${product.id}`}>
                <a css={productLinkStyles}>
                  <div css={productNameStyles}>{product.name}</div>
                  <Image src={PizzaIso} />
                </a>
              </Link>
              <button onClick={() => addProductToCart(product.id)}>
                €{formatPrice(product.price)}
                <BiCart height="40" />
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const productsList = await getProducts();

  return {
    props: {
      // In the props object, you can pass back
      // whatever information you want
      products: productsList,
    },
  };
}
