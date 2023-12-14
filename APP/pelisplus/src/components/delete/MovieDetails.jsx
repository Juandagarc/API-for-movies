import React from 'react';
import MovieDelete from './MovieDelete';

const MovieDetails = ({ pelicula, onDelete }) => {
  return (
    <div>
      <h2>{pelicula.titulo}</h2>
      <p>Descripción: {pelicula.descripcion}</p>
      <p>Director: {pelicula.director}</p>
      <p>Género: {pelicula.genero}</p>
      <p>Año: {pelicula.año}</p>
      <p>Duración: {pelicula.duracion} minutos</p>
      <img src={pelicula.imagen} alt={pelicula.titulo} />
      <MovieDelete peliculaId={pelicula.id} onDelete={onDelete} />
    </div>
  );
};

export default MovieDetails;
