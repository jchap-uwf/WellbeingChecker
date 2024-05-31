const mongoose = require('mongoose');
const Disaster = mongoose.model('Disaster');
const User = mongoose.model('User');

module.exports = {

  addDisasters: async () => {
    try {
      await Disaster.create({name: 'California Wildfires'});
      await Disaster.create({name: 'Hurricane Sally'});
      await Disaster.create({name: 'Hurricane Laura'});
      await Disaster.create({name: 'Hurricane Eta'});
    } catch (err) {
      console.error(err);
    }
  },

  addUsers: async () => {
    await User.create({
      username: 'pmatthews',
      password: '$2a$10$0Wz99HToBXUkMjSCIviZMOHF5BIFHstEPaljYKB/nUtJRJjE1WE8y',
      access: 'user' 
    });

    await User.create({
      username: 'japple',
      password: '$2a$10$0Wz99HToBXUkMjSCIviZMOHF5BIFHstEPaljYKB/nUtJRJjE1WE8y',
      access: 'user' 
    });

    await User.create({
      username: 'creynolds',
      password: '$2a$10$0Wz99HToBXUkMjSCIviZMOHF5BIFHstEPaljYKB/nUtJRJjE1WE8y',
      access: 'user' 
    });

    await User.create({
      username: 'yspiegelman',
      password: '$2a$10$0Wz99HToBXUkMjSCIviZMOHF5BIFHstEPaljYKB/nUtJRJjE1WE8y',
      access: 'admin' 
    });
  }
};