import React, { Component } from 'react';
import Nav from './Nav';
import SearchArea from './SearchArea';
import MovieList from './MovieList';
import Pagination from './Pagination';
import MovieInfo from './MovieInfo';

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      searchTerm: '',
      totalResults: 0,
      currentPage: 1,
      currentMovie: null
    }
    this.apiKey = process.env.REACT_APP_APIKEY
  }

  getMovies = async () => {
    const movieResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}&primary_release_year=2020&sort_by=primary_release_year.asc&popularity.gte=10`);
    const movieData = await movieResponse.json();
    setMovies(movieData);
  };

  handleQuery = (e) => {
    e.preventDefault();

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}&primary_release_year=2020&sort_by=primary_release_year.asc&popularity.gte=10`)
    .then(data => data.json())
    .then(data => {
      console.log(data);
      this.setState({ movies: [...data.results], totalResults: data.total_results})
    })
  }

  handleChange = (e) => {
    this.setState ({ searchTerm: e.target.value })
  }

  nextPage = (pageNumber) => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}&page=${pageNumber}&primary_release_year=2020&sort_by=primary_release_year.asc&popularity.gte=10`)
    .then(data => data.json())
    .then(data => {
      console.log(data);

      this.setState({ movies: [...data.results], currentPage: pageNumber})
    })
  }

  movieInfo = (id) => {
    const filteredMovie = this.state.movies.filter(movie => movie.id == id)

    const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null
    
    this.setState({ currentMovie: newCurrentMovie })
  }


  backToMovies = () => {
    this.setState({ currentMovie: null })
  }

  render() {
    const numberPages = Math.floor(this.state.totalResults / 20);

    return (
      <div className="App">
        <Nav />
        {this.state.currentMovie == null ? <div><SearchArea handleQuery={this.handleQuery} handleChange={this.handleChange}/><MovieList movieInfo={this.movieInfo} movies={this.state.movies} /></div> : <MovieInfo currentMovie={this.state.currentMovie} backToMovies={this.backToMovies} />}
        { this.state.totalResults > 20 && this.state.currentMovie == null ? <Pagination pages={numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage} /> : '' }
      </div>
    );
  }
}

export default App;
