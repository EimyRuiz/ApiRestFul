const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./backend/config/database');

dotenv.config();
const app = express();
app.use(express.json());



const Producto = require('./backend/models/producto.model');

const Usuario = require('./backend/models/usuario.model');

// POST - Registrar producto
app.post('/registrarproducto', async (req, res) => {
  try {
    const nuevoProducto = await Producto.create(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error('❌ Error al registrar producto:', error);
    res.status(400).json({ mensaje: 'Error al registrar producto' });
  }
});

// GET - Consultar todos los productos
app.get('/consultarproductos', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar productos' });
  }
});

// GET - Consultar producto por referencia
app.get('/consultarproducto/:referencia', async (req, res) => {
  try {
    const producto = await Producto.findOne({ referencia: req.params.referencia });
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar producto' });
  }
});

// PUT - Actualizar producto por referencia
app.put('/actualizarproducto/:referencia', async (req, res) => {
  try {
    const productoActualizado = await Producto.findOneAndUpdate(
      { referencia: req.params.referencia },
      req.body,
      { new: true }
    );
    res.status(200).json(productoActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar producto' });
  }
});

// DELETE - Eliminar producto por referencia
app.delete('/eliminarproducto/:referencia', async (req, res) => {
  try {
    const resultado = await Producto.deleteOne({ referencia: req.params.referencia });
    res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar producto' });
  }
});



app.get('/consultarusuario/:correo', async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ correo: req.params.correo });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (err) {
    console.error('Error al consultar usuario:', err);
    res.status(500).json({ mensaje: 'Error al consultar usuario' });
  }
});



app.post('/registrarusuario', async (req, res) => {
  try {
    const nuevoUsuario = await Usuario.create(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    console.error('❌ Error al registrar usuario:', err);
    res.status(400).json({ mensaje: 'Error al registrar usuario' });
  }
});




// Conectar a MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('hola mundo');
});



app.get('/insertarusuario', (req, res) => {
  const nuevoUsuario = new Usuario({
    nombre: 'Juanito',
    edad: 30,
    correo: 'juan.perez@ejemplo.com'
  });

  nuevoUsuario.save()
    .then(usuario => {
      console.log('Usuario creado:', usuario);
      res.send('Usuario creado correctamente');
    })
    .catch(err => {
      console.error('Error al crear usuario:', err);
      res.status(500).send('Error al crear usuario');
    });
});


app.get('/consultarusuarios', (req, res) => {
  Usuario.find()
    .then(usuarios => {
      console.log('Usuarios encontrados:', usuarios);
      res.json(usuarios);
    })
    .catch(err => {
      console.error('Error al consultar usuarios:', err);
      res.status(500).send('Error al consultar usuarios');
    });
});


app.get('/actualizarusuario', (req, res) => {
  Usuario.updateOne(
    { correo: 'juan.perez@ejemplo.com' },
    { edad: 31 }
  )
  .then(resultado => {
    console.log('Usuario actualizado:', resultado);
    res.send('Usuario actualizado');
  })
  .catch(err => {
    console.error('Error al actualizar usuario:', err);
    res.status(500).send('Error al actualizar usuario');
  });
});



app.get('/eliminarusuario', (req, res) => {
  Usuario.deleteOne({ correo: 'juan.perez@ejemplo.com' })
  .then(resultado => {
    console.log('Usuario eliminado:', resultado);
    res.send('Usuario eliminado correctamente');
  })
  .catch(err => {
    console.error('Error al eliminar usuario:', err);
    res.status(500).send('Error al eliminar usuario');
  });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
