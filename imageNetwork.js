const express = require('express'); // Importa express para gestionar las rutas
const router = express.Router(); // Crea un router de express
const multer = require('multer'); // Importa multer para gestionar la subida de archivos
const upload = multer({ dest: 'uploads/' }); // Configura multer para guardar archivos temporalmente en la carpeta 'uploads/'
const Controller = require('../controllers/imageControllers'); // Importa el controlador de imágenes

// Función asíncrona para subir una imagen
async function onNewImage(request, response) {
    const file = request.file; // Obtiene el archivo enviado en el request
    const result = await Controller.onNewImages(file.path); // Llama a la función para subir la imagen
    response.send(result.data); // Envía la respuesta (se asume que el resultado tiene una propiedad data)
}

// Función asíncrona para eliminar una imagen por su ID
async function deleteImage(request, response) {
    const imageId = request.params.imageId; // Obtiene el ID de la imagen de los parámetros de la URL
    const result = await Controller.deleteImage(imageId); // Llama a la función para eliminar la imagen
    response.send(result.data); // Envía la respuesta (se asume que el resultado tiene una propiedad data)
}

// NUEVO ENDPOINT: Endpoint GET para obtener la lista de imágenes desde Cloudflare
router.get("/", async (request, response) => {
    const result = await Controller.getImages(); // Llama a la función getImages del controlador
    response.send(result); // Envía el resultado obtenido (la lista de imágenes)
});

// Define la ruta POST para subir imágenes usando multer para procesar el archivo
router.post("/uploads", upload.single('file'), onNewImage);
// Define la ruta DELETE para eliminar una imagen pasando su imageId en la URL
router.delete("/:imageId", deleteImage);

module.exports = router; // Exporta el router para usarlo en la configuración de rutas del servidor
