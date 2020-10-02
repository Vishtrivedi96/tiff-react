import React from 'react';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../../config';
import PropTypes from 'prop-types';
import MovieThumb from '../MovieThumb/MovieThumb';
import './MovieInfo.css';

const MovieInfo = ({ movie }) => (
  <div className="tiff-movieinfo">
    <div className="tiff-movieinfo-content">
      <div className="tiff-movieinfo-thumb">
        <MovieThumb
          image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : './images/no_image.jpg'}
          clickable={false}
        />
      </div>
      <div className="tiff-movieinfo-text">
        <h1>{movie.title}</h1>
        <h2>Description</h2>
        <p>{movie.overview}</p>
        <h2>Runtime</h2>
        <p>{movie.runtime} minutes</p>
        <h2>Release Date</h2>
        <p>{movie.release_date}</p>
        <h2>Tagline</h2>
        <p>{movie.tagline}</p>
        {movie.genres.name > 1 ? <h2>Genres</h2> : <h2>Genre</h2>}
        <p>{movie.genres.name}</p><p>Placeholder</p>
      </div>
      <img className="tiff-film-icon" src="/images/noun_Movie_1241202.png" alt="decorative film icon" />
    </div>
  </div>
)

MovieInfo.propTypes = {
  movie: PropTypes.object,
  directors: PropTypes.array
}

export default MovieInfo;