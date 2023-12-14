import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieUpdate = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8000/peliculas');
        setMovies(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de películas:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setFormData({
      titulo: movie.titulo,
      descripcion: movie.descripcion,
      director: movie.director,
      genero: movie.genero,
      año: movie.año,
      duracion: movie.duracion,
      imagen: movie.imagen,
      extension: movie.extension,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8000/pelicula/${selectedMovie.id}`, formData);
      console.log('Película actualizada con éxito');
      setMovies([]); // Recarga la lista de películas
      setSelectedMovie(null); // Desselecciona la película
      //Se recarga la pagina para que se actualice la lista de peliculas
      window.location.reload();
    } catch (error) {
      console.error('Error al actualizar la película:', error.response.data);
      alert('Error al actualizar la película');
    }
  };

  return (
    <div>
      <h2>Actualizar Película</h2>
      <div>
        <h3>Selecciona una película:</h3>
        <ul>
          {movies.map((movie) => (
            <li key={movie.id} onClick={() => handleMovieSelect(movie)}>
              {movie.titulo}
            </li>
          ))}
        </ul>
      </div>
      {selectedMovie && (
        <form onSubmit={handleSubmit}>
          <h3>Actualizando: {selectedMovie.titulo}</h3>
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
          <button type="submit">Actualizar Película</button>
        </form>
      )}
    </div>
  );
};

export default MovieUpdate;
