import React from 'react';

const Movie = (props) => {
    return (
        <li className="col">
            <div className="card">
                <div className="card-image waves-effect waves-light">
                    <img alt="" src={`http://image.tmdb.org/t/p/w185${props.image}`}/>
                </div>
                <div className="card-content">
                    <span>
                        <a aria-label="Click here to view details" onClick = {() => props.movieInfo(props.movieId) } href="#">View Details</a>
                    </span>
                </div>
            </div>
        </li>
    )
}

export default Movie;