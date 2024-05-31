module.exports = {
  cookieSecret: 'cookie',
  mongo: {
    development: {
      connectionString: 'mongodb://localhost:27017' // Defaults to localhost, change if using Mongodb Atlas
    },
    production: {
      connectionString: 'mongodb://localhost:27017'
    },
  }
};
