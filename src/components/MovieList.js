import React from 'react';
import Movie from './Movie'

const MovieList = (props) => {
    return (
        <section className="">
            <ul className="row">
                {
                    props.movies.map((movie,i) => {
                        return (
                            <Movie key={i} movieInfo={props.movieInfo} movieId={movie.id} image={movie.poster_path}/>
                        )
                    })
                }
            </ul>
        </section>
    )
}

export default MovieList;