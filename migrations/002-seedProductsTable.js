const products = [
  {
    name: 'avocado',
    price: 890,
  },
  {
    name: 'margerita',
    price: 640,
  },
  {
    name: 'funghi',
    price: 780,
  },
  {
    name: 'schinken',
    price: 780,
  },
  {
    name: 'salami',
    price: 780,
  },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO products ${sql(products, 'name', 'price')}
  `;
};

exports.down = async (sql) => {
  for (const product of products) {
    await sql`
      DELETE FROM
        products
      WHERE
        name = ${product.name} AND
        price = ${product.price}
    `;
  }
};
