const toppings = [
  {
    name: 'tomatensauce',
  },
  {
    name: 'kaese',
  },
  {
    name: 'oregano',
  },
  {
    name: 'schinkken',
  },
  {
    name: 'salami',
  },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO toppings ${sql(toppings, 'name')}
  `;
};

exports.down = async (sql) => {
  for (const topping of toppings) {
    await sql`
      DELETE FROM
        toppings
      WHERE
        name = ${topping.name}
    `;
  }
};
