import React, { useState, useEffect } from 'react';
import './App.css';
import Add from './components/add/add';
import MovieList from './components/delete/MovieList';
import MovieUpdate from './components/MovieUpdate/MovieUpdate';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  async function getMovies() {
    try {
      const response = await fetch('http://localhost:8000/peliculas');
      const fetchedData = await response.json();
      const updatedData = fetchedData.map((pelicula) => ({
        ...pelicula,
        imagen: `http://localhost:8000/images/${pelicula.imagen}.${pelicula.extension}`,
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
      await response.json();

      setData((prevData) =>
        prevData.map((pelicula) =>
          pelicula.id === id ? { ...pelicula, mostrarDescripcion: !pelicula.mostrarDescripcion } : pelicula
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="app-container">
      <span className="material-symbols-outlined" onClick={toggleMenu}>
        menu
      </span>

      {menuVisible && (
        <div className="menu">
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="">...</option>
            <option value="add">Agregar Película</option>
            <option value="delete">Eliminar Película</option>
            <option value="update">Actualizar Película</option>
          </select>
        </div>
      )}

      {selectedOption === 'add' && (
        <div className="popup-container">
          <Add />
        </div>
      )}
      {selectedOption === 'delete' && (
        <div className="popup-container">
          <MovieList />
        </div>
      )}
      {selectedOption === 'update' && (
        <div className="popup-container">
          <MovieUpdate />
        </div>
      )}

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
