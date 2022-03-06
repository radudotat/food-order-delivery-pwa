const setPostgresDefaultsOnHeroku = require('./lib/herokuDefaults');

setPostgresDefaultsOnHeroku();

const options = {
  length: 3,
};

if (process.env.NODE_ENV === 'production') {
  options.ssl = { rejectUnauthorized: false };
}

module.exports = options;
