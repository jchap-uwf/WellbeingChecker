const mongoose = require('mongoose');

    /* Disaster Schema */
    const disasterSchema = mongoose.Schema({
      name: String
    });
    mongoose.model('Disaster', disasterSchema);

    /* Report Schema */
    const reportSchema = mongoose.Schema({
      
      // This tells mongo we are storing a reference to a disaster id (like a foreign key)
      disaster: { type: mongoose.Schema.Types.ObjectId, ref: 'Disaster' },

      username: String,
      firstName: String,
      lastName: String,
      email: String,
      areaCode: Number,
      exchange: Number,
      extension: Number,
      currentLocation: String,
      statusOfResidence: String,
      message: String,
      dateFiled: Date
    });
    mongoose.model('Report', reportSchema);

    /* User Schema */
    const userSchema = mongoose.Schema({
      username: String,
      password: String,
      access: String
    });
    mongoose.model('User', userSchema);


