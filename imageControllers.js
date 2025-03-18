const Cloudflare = require('../services/cloudflare'); // Importa el servicio Cloudflare
const path = require('path'); // Importa path (en este caso no se utiliza, pero lo dejas según tu código original)

// Función para subir una imagen: se llama al método uploadImage de Cloudflare y retorna el resultado
async function onNewImages(filePath) {
    const cloudFlare = Cloudflare.getInstance(); // Obtiene la instancia singleton de Cloudflare
    return cloudFlare.uploadImage(filePath); // Sube la imagen y retorna la respuesta de Cloudflare
}

// Función para eliminar una imagen: se llama al método deleteImage de Cloudflare y retorna el resultado
function deleteImage(imageId) {
    const cloudFlare = Cloudflare.getInstance(); // Obtiene la instancia singleton de Cloudflare
    return cloudFlare.deleteImage(imageId); // Elimina la imagen por su ID y retorna la respuesta
}

// NUEVA FUNCIÓN: Obtener la lista de imágenes desde Cloudflare usando el método listImages
async function getImages() {
    const cloudFlare = Cloudflare.getInstance(); // Obtiene la instancia singleton de Cloudflare
    return cloudFlare.listImages(); // Llama al método que lista las imágenes y retorna la respuesta
}

// Exporta las funciones para que puedan ser utilizadas en el network
module.exports = {
    onNewImages,
    deleteImage,
    getImages
};
