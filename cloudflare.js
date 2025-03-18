const Client = require('./axios'); // Importa el cliente Axios configurado
const fs = require('fs'); // Importa fs para leer archivos
const FormData = require('form-data'); // Importa FormData para enviar archivos en formato multipart/form-data

class Cloudflare extends Client {
    // Variable estática para almacenar la instancia única (singleton)
    static instance;

    // Método estático para obtener la instancia de Cloudflare (singleton)
    static getInstance() {
        if (!Cloudflare.instance) {
            Cloudflare.instance = new Cloudflare();
        }
        return Cloudflare.instance;
    }

    constructor() {
        super(); // Llama al constructor de la clase padre (Client)
    }

    // Método para subir una imagen a Cloudflare
    async uploadImage(filePath) {
        const formData = new FormData(); // Crea un objeto FormData para enviar el archivo
        formData.append('file', fs.createReadStream(filePath)); // Agrega el archivo al FormData usando un stream de lectura
        // Envía una solicitud POST a la API de Cloudflare para subir la imagen
        const resultado = await this.client.post('/accounts/513e4a1c22c112b791455d79282b4145/images/v1', formData); //id de la cuenta
        return resultado.data; // Retorna los datos de la respuesta
    }

    // Método para eliminar una imagen en Cloudflare mediante el ID
    deleteImage(imageId) {
        return this.client.delete('/accounts/513e4a1c22c112b791455d79282b4145/images/v1/' + imageId);
    }

    // Método para listar las imágenes existentes en Cloudflare
    async listImages() {
        // Realiza una solicitud GET a la API de Cloudflare para listar las imágenes
        const resultado = await this.client.get('/accounts/513e4a1c22c112b791455d79282b4145/images/v1');
        // Se asume que Cloudflare retorna un objeto con la propiedad "result" que contiene el arreglo de imágenes.
        return resultado.data.result; // Retorna solo el arreglo de imágenes
    }
}

module.exports = Cloudflare; // Exporta la clase Cloudflare para que pueda ser utilizada en otros módulos