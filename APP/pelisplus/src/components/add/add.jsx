import React, { useState } from 'react';
import axios from 'axios';
import './add.css';


const Add = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    director: '',
    genero: '',
    año: 0,
    duracion: 0,
    imagen: '',
    extension: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/agregar_pelicula', formData);
      console.log('Película creada:', response.data);

      // Puedes hacer algo con la respuesta, como actualizar el estado de tu aplicación
      alert('Película creada con éxito');
    
      // Limpiar el formulario después de la creación exitosa
      setFormData({
        titulo: '',
        descripcion: '',
        director: '',
        genero: '',
        año: 0,
        duracion: 0,
        imagen: '',
        extension: '',
        
      }
      );
      //Se recarga la pagina para que se actualice la lista de peliculas
      window.location.reload();
    } catch (error) {
      console.error('Error al crear la película:', error.response.data);

      const errorMessage = error.response.data.detail || 'Error al crear la película';
      alert(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Título:
        <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} />
      </label>
      <label>
        Descripción:
        <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} />
      </label>
      <label>
        Director:
        <input type="text" name="director" value={formData.director} onChange={handleChange} />
      </label>
      <label>
        Género:
        <input type="text" name="genero" value={formData.genero} onChange={handleChange} />
      </label>
      <label>
        Año:
        <input type="number" name="año" value={formData.año} onChange={handleChange} />
      </label>
      <label>
        Duración:
        <input type="number" name="duracion" value={formData.duracion} onChange={handleChange} />
      </label>
      <label>
        Imagen:
        <input type="text" name="imagen" value={formData.imagen} onChange={handleChange} />
      </label>
      <label>
        Extensión:
        <input type="text" name="extension" value={formData.extension} onChange={handleChange} />
      </label>
      <button type="submit" className='boton-form'>Crear Película</button>
    </form>
  );
};

export default Add;
