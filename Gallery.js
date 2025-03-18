import React, { useState, useEffect } from "react"; // Importa React y hooks necesarios
import ImageList from "@mui/material/ImageList"; // Componente de MUI para mostrar la lista de imágenes
import ImageListItem from "@mui/material/ImageListItem"; // Componente para cada imagen en la lista
import IconButton from "@mui/material/IconButton"; // Botón para la acción de eliminar
import DeleteIcon from "@mui/icons-material/Delete"; // Icono de eliminar de MUI
import Button from "@mui/material/Button"; // Botón de MUI para subir imagen
import Box from "@mui/material/Box"; // Contenedor de MUI para estilos
import ImageModal from "./ImageModal"; // Componente para mostrar la imagen en modal
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// URL base del backend (asegúrate de que coincide con la configuración)
const API_BASE_URL = "http://localhost:3000/images";

const Gallery = () => {
  const [images, setImages] = useState([]); // Estado para almacenar la lista de imágenes
  const [loading, setLoading] = useState(false); // Estado de carga (ya no se muestra mensaje en pantalla)
  const [error, setError] = useState(null); // Estado para errores en las peticiones
  const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen seleccionada para el modal
  const [size, setSize] = useState('');

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  // Función para obtener las imágenes del backend
  const fetchImages = async () => {
    try {
      setLoading(true); // Inicia el estado de carga
      const response = await fetch(API_BASE_URL); // Hace la petición GET al endpoint
      if (!response.ok) {
        throw new Error("Error al cargar las imágenes");
      }
      const data = await response.json(); // Convierte la respuesta a JSON
      console.log("Respuesta de GET:", data); // Imprime la respuesta para revisar la estructura

      // Extrae el arreglo de imágenes de la propiedad "images"
      let imagesArray = [];
      if (Array.isArray(data.images)) {
        imagesArray = data.images;
      } else {
        console.warn("Formato de datos no reconocido:", data);
      }
      setImages(data.images); // Actualiza el estado con el arreglo de imágenes
      setLoading(false); // Finaliza el estado de carga
    } catch (err) {
      setError(err.message); // Guarda el mensaje de error
      setLoading(false); // Finaliza el estado de carga aun en error
    }
    console.log(images)
  };

  // Se carga la lista de imágenes al montar el componente
  useEffect(() => {
    fetchImages();
  }, []);

  // Función que se ejecuta al seleccionar un archivo para subir
  const handleFileChange = async (event) => {
    const file = event.target.files[0]; // Obtiene el primer archivo seleccionado
    if (!file) return; // Si no hay archivo, finaliza la función
    const formData = new FormData(); // Crea un objeto FormData para enviar el archivo
    formData.append("file", file); // Agrega el archivo con la clave "file"
    try {
      // Realiza la petición POST para subir la imagen
      const response = await fetch(`${API_BASE_URL}/uploads`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Error al subir la imagen");
      }
      fetchImages(); // Actualiza la lista de imágenes tras la subida
    } catch (err) {
      setError(err.message);
    }
  };

  // Función para simular el clic en el input de tipo file (oculto)
  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  // Función para eliminar una imagen usando su ID
  const handleDelete = async (imageId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${imageId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error al eliminar la imagen");
      }
      fetchImages(); // Actualiza la lista tras la eliminación
    } catch (err) {
      setError(err.message);
    }
  };

  // Función para abrir el modal al hacer clic en la imagen
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <Box sx={{ padding: 2 }}>
       <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Size</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={size}
        label="Size"
        onChange={handleChange}
      >
        <MenuItem value="">
        </MenuItem>
        <MenuItem value={"pequeno"}>Pequeño</MenuItem>
        <MenuItem value={"mediano"}>Mediano</MenuItem>
        <MenuItem value={"grande"}>Grande</MenuItem>
      </Select>
    </FormControl>
  

      {/* Botón para subir imagen */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUploadClick}
        sx={{ marginBottom: 2 }}
      >
        Subir Imagen
      </Button>
      {/* Input de archivo oculto */}
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {/* Muestra el error si ocurre */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* Renderiza la galería si hay imágenes */}
      {Array.isArray(images) && images.length > 0 ? (
        <ImageList variant="masonry" cols={3} gap={8}>
          {images.map((item) => (
            <ImageListItem key={item.id}>
              <img
                // Usa la segunda variante para mostrar la imagen en 250x250
                src={`${item.variants[0]}?w=250&h=250&fit=crop`}
                srcSet={`${item.variants[1]}?w=250&h=250&fit=crop&dpr=2 2x`}
                alt="Imagen"
                loading="lazy"
                style={{ cursor: "pointer" }}
                onClick={() => handleImageClick(item)}
              />
              {/* Botón para eliminar la imagen */}
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(item.id)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "rgba(210, 202, 202, 0.7)",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        !loading && <p>No se encontraron imágenes para mostrar.</p>
      )}
      {/* Modal para ver la imagen ampliada */}
      <ImageModal size = {size} image={selectedImage} onClose={handleCloseModal} />
    </Box>
  );
};

export default Gallery;