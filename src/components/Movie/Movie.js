import React, { Component } from 'react';
import { API_URL } from '../../config';
import Navigation from '../subcomponents/Navigation/Navigation';
import MovieInfo from '../subcomponents/MovieInfo/MovieInfo';
import Spinner from '../subcomponents/Spinner/Spinner';
import './Movie.css';

class Movie extends Component {
  state = {
    movie: null,
    loading: false
  }

  componentDidMount() {
    const { movieId } = this.props.match.params;

    if (localStorage.getItem(`${movieId}`)) {
      let state = JSON.parse(localStorage.getItem(`${movieId}`))
      this.setState({ ...state })
    } else {
      this.setState({ loading: true })
      let endpoint = `${API_URL}movie/${movieId}?api_key=${process.env.REACT_APP_APIKEY}&primary_release_year=2020&sort_by=primary_release_year.asc&popularity.gte=10`;
      this.fetchItems(endpoint);
    }
  }

  fetchItems = (endpoint) => {
    // ES6 destructuring the props
    const { movieId } = this.props.match.params;

    fetch(endpoint)
    .then(result => result.json())
    .then(result => {

      if (result.status_code) {
        // If we don't find any movie
        this.setState({ loading: false });
      } else {
        this.setState({ movie: result }, () => {
          // ... then fetch actors in the setState callback function
          let endpoint = `${API_URL}movie/${movieId}/credits?api_key=${process.env.REACT_APP_APIKEY}`;
          fetch(endpoint)
          .then(result => result.json())
          .then(result => {
            this.setState({
              actors: result.cast,
              loading: false
            }, () => {
              localStorage.setItem(`${movieId}`, JSON.stringify(this.state));
            })
          })
        })
      }
    })
    .catch(error => console.error('Error:', error))
  }

  render() {
    // ES6 Destructuring the props and state
    const { movieName } = this.props.location;
    const { movie, loading } = this.state;

    return (
      <div className="tiff-movie">
        {movie ?
        <div>
          <Navigation movie={movieName} />
          <MovieInfo movie={movie}/>
        </div>
        : null }
        {loading ? <Spinner /> : null}
      </div>
    )
  }
}

export default Movie;