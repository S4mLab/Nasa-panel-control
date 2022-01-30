const mongoose = require('mongoose');

// to make your life easier, use the name that is used in the frontend
const planetSchema = mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  },
});

// basically mongodb will planetSchema to contruct the planet document in planets collection
// in the other word, mongo is  compiling/modelling the planetSchema into planet document
module.exports = mongoose.model('Planet', planetSchema);
