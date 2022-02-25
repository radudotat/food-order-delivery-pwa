import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import { getProductById, Product } from '../helpers/database';
// import Image from 'next/image';
// import Layout from '../../components/Layout';
import formatPrice from '../helpers/helpers';

type Props = {
  product: Product;
};

export default function SingleProduct(props: Props) {
  // console.log('SingleProduct', props);
  return (
    <>
      <Head>
        <title>
          {props.product.name} ({props.product.price})
        </title>
        <meta
          name="description"
          content={`${props.product.name} is a €${formatPrice(
            props.product.price,
          )}`}
        />
      </Head>
      <h1>
        {props.product.name} (€{formatPrice(props.product.price)})
      </h1>
      <p>{JSON.stringify(props)}</p>
      {/* <Image
        src={`/products/${props.product.id}.jpg`}
        width="300"
        height="300"
      /> */}
      <div>id: {props.product.id}</div>
      <div>Name: {props.product.name}</div>
      <div>Price: €{formatPrice(props.product.price)}</div>
    </>
  );
}

// The parameter `context` gets passed from Next.js
// and includes a bunch of information about the
// request
export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{ product?: Product }>> {
  // This is the variable that we get from the URL
  // (anything after the slash)
  const productId = context.query.productId;

  if (!productId || Array.isArray(productId)) {
    return { props: {} };
  }

  const product = await getProductById(parseInt(productId));
  // console.log('product', product, context.query);

  return {
    props: {
      product: product,
      // productId: productId,
    },
  };
}
