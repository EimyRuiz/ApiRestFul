const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./backend/config/database');

dotenv.config();
const app = express();
const Usuario = require('./backend/models/usuario.model');


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
