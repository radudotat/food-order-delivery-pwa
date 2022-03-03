const users = [
  {
    username: 'user',
    password_hash: '$2a$12$FB89WhHxgl/q.bkS9N7jaO/KOZTDLKlb/AcS/saMw/.kaY1zEfTSC', //password
  },
  {
    username: 'admin',
    password_hash: '$2a$12$FB89WhHxgl/q.bkS9N7jaO/KOZTDLKlb/AcS/saMw/.kaY1zEfTSC',
  },
  {
    username: 'owner',
    password_hash: '$2a$12$FB89WhHxgl/q.bkS9N7jaO/KOZTDLKlb/AcS/saMw/.kaY1zEfTSC',
  },
  {
    username: 'employee',
    password_hash: '$2a$12$FB89WhHxgl/q.bkS9N7jaO/KOZTDLKlb/AcS/saMw/.kaY1zEfTSC',
  },
  {
    username: 'delivery',
    password_hash: '$2a$12$FB89WhHxgl/q.bkS9N7jaO/KOZTDLKlb/AcS/saMw/.kaY1zEfTSC',
  },
]

exports.up = async (sql) => {
  await sql`
      INSERT INTO users ${sql(users, 'username', 'password_hash')}
  `
}

exports.down = async (sql) => {
  for (const user of users) {
    await sql`
        DELETE
        FROM users
        WHERE username = ${user.username}
    `
  }
}
