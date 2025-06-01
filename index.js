const fs = require('fs');

// Nombre de la carpeta que quieres crear
const folderName = 'router.js';

// Verifica si la carpeta no existe
if (!fs.existsSync(folderName)) {
  // Crea la carpeta
  fs.mkdirSync(folderName);
  console.log(`La carpeta '${folderName}' ha sido creada exitosamente.`);
} else {
  console.log(`La carpeta '${folderName}' ya existe.`);
}
