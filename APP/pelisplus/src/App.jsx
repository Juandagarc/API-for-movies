import React, { useState, useEffect } from 'react';
import './App.css';
import Add from './components/add/add';
import MovieList from './components/delete/MovieList';
import MovieUpdate from './components/MovieUpdate/MovieUpdate';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getMovies() {
    try {
      const response = await fetch('http://localhost:8000/peliculas');
      const fetchedData = await response.json();
      // Actualiza las rutas de las imágenes
      const updatedData = fetchedData.map(pelicula => ({
        ...pelicula,
        imagen: `http://localhost:8000/images/${pelicula.imagen}.${pelicula.extension}`
      }));
      setData(updatedData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  const toggleDescripcion = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/pelicula/${id}`);
      const updatedData = await response.json();

      setData((prevData) =>
        prevData.map((pelicula) =>
          pelicula.id === id ? { ...pelicula, mostrarDescripcion: !pelicula.mostrarDescripcion } : pelicula
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app-container">
      <Add />
      <br /> <br />
      < MovieList />
      <br /><br />
      < MovieUpdate />
      <h1 className="main-title">Peliculas</h1>
      <div className="movies-container">
        {loading ? (
          <p>Cargando películas...</p>
        ) : (
          data.map((pelicula) => (
            <div key={pelicula.id} className="movie-card">
              <h2>{pelicula.titulo}</h2>
              {pelicula.mostrarDescripcion && <p>{pelicula.descripcion}</p>}
              <p>Director: {pelicula.director}</p>

              {/* Utiliza la URL actualizada de la imagen */}
              <img src={pelicula.imagen} alt={pelicula.titulo} />

              <button onClick={() => toggleDescripcion(pelicula.id)}>
                {pelicula.mostrarDescripcion ? 'Ocultar' : 'Mostrar'} descripción
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
