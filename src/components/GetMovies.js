import React, { useState, useEffect } from 'react';

const [movies, setMovies] = useState([]);

const getMovies = async () => {
    const movieResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}&primary_release_year=2020&sort_by=primary_release_year.asc&popularity.gte=10`);
    const movieData = await movieResponse.json();
    setMovies(movieData);
};

useEffect(() => {
    getMovies();
}, [])


export default GetMovies;