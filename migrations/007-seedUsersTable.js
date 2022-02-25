const users = [
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
    INSERT INTO users ${sql(users, 'name')}
  `;
};

exports.down = async (sql) => {
  for (const user of users) {
    await sql`
      DELETE FROM
        users
      WHERE
        name = ${user.name}
    `;
  }
};
