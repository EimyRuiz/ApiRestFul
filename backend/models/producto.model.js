const mongoose = require('../config/connection');


const esquemaProducto = mongoose.Schema({
  referencia: {
    type: String,
    required: [true, 'La referencia es obligatoria'],
    unique: true,
    trim: true
  },
  nombre: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio']
  },
  precio: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
  },
  stock: {
    type: Number,
    default: 0
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

const Producto = mongoose.model('Producto', esquemaProducto);
module.exports = Producto;
