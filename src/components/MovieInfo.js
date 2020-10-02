import React from 'react';

const MovieInfo = (props) => {
    return (
        <div className="container">
            <div className="row" >
                <a onClick={props.backToMovies} style={{paddingTop: 50, cursor: "pointer"}}>
                    <i className="fas fa-arrow-left"></i>
                    <span className="">Go back</span>
                </a>
            </div>
            <div className="row">
                <div className="col s12 m8">
                    <div className="info-container">
                        <p>{props.currentMovie.title}</p>
                        <p>{props.currentMovie.popularity}</p>
                        <p>{props.currentMovie.genre_ids}</p>
                        <p>{props.currentMovie.release_date}</p>
                        <p>{props.currentMovie.overview}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieInfo;