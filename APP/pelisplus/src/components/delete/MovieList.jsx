import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieDetails from './MovieDetails';

const MovieList = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // Obtener la lista de películas al cargar el componente
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const response = await axios.get('http://localhost:8000/peliculas');
      setPeliculas(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de películas:', error);
    }
  };

  const handleMovieSelect = (pelicula) => {
    setSelectedMovie(pelicula);
  };

  const handleMovieDelete = () => {
    // Puedes agregar lógica para actualizar el estado o realizar acciones adicionales después de la eliminación
    console.log('Película eliminada, actualizando estado o realizando acciones adicionales...');
    setSelectedMovie(null); // Deselecciona la película después de eliminarla
    getMovies(); // Actualiza la lista de películas
  };

  return (
    <div>
      <h1>Lista de Películas</h1>
      <ul>
        {peliculas.map((pelicula) => (
          <li key={pelicula.id} onClick={() => handleMovieSelect(pelicula)}>
            {pelicula.titulo}
          </li>
        ))}
      </ul>
      {selectedMovie && (
        <MovieDetails pelicula={selectedMovie} onDelete={handleMovieDelete} />
      )}
    </div>
  );
};

export default MovieList;
