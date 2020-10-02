import React, { Component } from 'react';
import { API_URL, IMAGE_BASE_URL, POSTER_SIZE } from '../../config';
import Grid from '../subcomponents/Grid/Grid';
import MovieThumb from '../subcomponents/MovieThumb/MovieThumb';
import LoadMoreButton from '../subcomponents/LoadMoreButton/LoadMoreButton';
import Spinner from '../subcomponents/Spinner/Spinner';
import './Home.css';

class Home extends Component {
  state = {
    movies: [],
    loading: false,
    currentPage: 0,
    totalPages: 0,
    queryTerm: '',
  }

  componentDidMount() {
    if (sessionStorage.getItem('HomeState')) {
      let state = JSON.parse(sessionStorage.getItem('HomeState'))
      this.setState({ ...state })
    } else {
      this.setState({ loading: true })
      this.fetchItems(this.popularEP(false)(""));
    }
  }

  //TODO: Investigate queryparameters
  curriedEndpoint = type => loadMore => queryTerm =>
    `${API_URL}${type}?api_key=${process.env.REACT_APP_APIKEY}&page=${loadMore
      && this.state.currentPage + 1}&query=${queryTerm}&primary_release_year=2020&sort_by=primary_release_year.asc&popularity.gte=10`;

  searchEP = this.curriedEndpoint("search/movie");
  popularEP = this.curriedEndpoint("movie/popular");

  updateItems = (loadMore, queryTerm) => {
    this.setState(
      {
        movies: loadMore ? [...this.state.movies] : [],
        loading: true,
        queryTerm: loadMore ? this.state.queryTerm : queryTerm,
      },
      () => {
        this.fetchItems(
          !this.state.queryTerm
          ? this.popularEP(loadMore)("")
          : this.searchEP(loadMore)(this.state.queryTerm)
        )
      }
    )
  }

  fetchItems = (endpoint) => {
    const { movies, queryTerm } = this.state;

    fetch(endpoint)
    .then(result => result.json())
    .then(result => {
      this.setState({
        movies: [...movies, ...result.results],
        loading: false,
        currentPage: result.page,
        totalPages: result.total_pages
      }, () => {
        if (queryTerm === "") {
          sessionStorage.setItem('HomeState', JSON.stringify(this.state));
        }
      })
    })
    .catch(error => console.error('Error:', error))
  }

  render() {
    const { movies, loading, currentPage, totalPages } = this.state;

    return (
      <main className="tiff-home">
          <div className="tiff-home-grid">
            <Grid
              header={'Top trending movies'}
              loading={loading}
            >
              {movies.map( (element, i) => (
                <MovieThumb
                  key={i}
                  clickable={true}
                  image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` : './images/no_image.jpg'}
                  movieId={element.id}
                  movieName={element.original_title}
                />
              ))}
            </Grid>
            {loading ? <Spinner /> : null}
            {(currentPage < totalPages && !loading) ?
              <LoadMoreButton text="Load More" onClick={this.updateItems} />
              : null
            }
          </div>
      </main>
    )
  }
}

export default Home;