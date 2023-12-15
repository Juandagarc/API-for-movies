import React from 'react';
import axios from 'axios';

const MovieDelete = ({ peliculaId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/pelicula/${peliculaId}`);
      console.log('Película eliminada con éxito');
      onDelete(); // Actualiza el estado o realiza acciones adicionales después de la eliminación
      //Se recarga la pagina para que se actualice la lista de peliculas
      window.location.reload();
    } catch (error) {
      console.error('Error al eliminar la película:', error.response.data);
      alert('Error al eliminar la película');
    }
  };

  return (
    <button onClick={handleDelete} className='boton-form'>Eliminar Película</button>
  );
};

export default MovieDelete;
