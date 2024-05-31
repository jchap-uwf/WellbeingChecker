const mongoose = require('mongoose');
var credentials = require('../credentials.js');

// Choose which URL to use for this connection
let dbURI = credentials.mongo.development.connectionString;
if (process.env.NODE_ENV === 'production') {
  dbURI = credentials.mongo.production.connectionString;
}

// Mongoose connection options
let options = { useUnifiedTopology: true, useNewUrlParser: true };

mongoose.connect(dbURI, options);

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

const gracefulShutdown = async (msg, callback) => {
  await mongoose.connection.close();
  console.log(`Mongoose disconnected through ${msg}`);
  callback();
};

// For nodemon restarts                                 
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});

// Require the specific schemas
require('./models');

// Load the data
const demoData = require('./demo_data');


// Uncomment these when you want to add the data to your db. Only run this once or you will have duplicates!
// demoData.addDisasters();
// demoData.addUsers();