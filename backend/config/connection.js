const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const URI = process.env.MONGO_URI;

mongoose.connect(URI)
  .then(() => console.log('Conectado a MongoDB desde connection.js'))
  .catch(err => console.error('Error en la conexión:', err));

module.exports = mongoose;
