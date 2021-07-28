import React from 'react';
import Button from 'react-bootstrap/Button';
import propTypes from 'prop-types';

import { Link } from "react-router-dom";
export class MovieView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <>
                <Link to={`/users/`}>
                    <Button variant="outline-dark">My Account</Button>
                </Link>
                <div className="movie-view">
                    <div className="movie-poster">
                        <img src={movie.ImagePath} />
                    </div>
                    <div className="movie-title">
                        <span className="label">Title: </span>
                        <span className="value">{movie.Title}</span>
                    </div>
                    <div className="movie-description">
                        <span className="label">Description: </span>
                        <span className="value">{movie.Description}</span>
                    </div>
                    <div className="movie-genre">
                        <span className="label">Genre: </span>
                        <span className="value">{movie.Genre.Name}</span>
                        <Link to={`/genre/${movie.Genre.Name}`}>
                            <Button variant="link">info on this Genre</Button>
                        </Link>
                    </div>
                    <div className="movie-director">
                        <span className="label">Director: </span>
                        <span className="value">{movie.Director.Name}</span>
                        <Link to={`/director/${movie.Director.Name}`}>
                            <Button variant="link">info on Director</Button>
                        </Link>
                    </div>
                </div>
                <Button variant="outline-dark" onClick={() => { onBackClick(null); }}>Back</Button>
            </>
        );
    }
}

MovieView.propTypes = {
    movie: propTypes.shape({
        Title: propTypes.string.isRequired,
        Description: propTypes.string.isRequired,
        ImagePath: propTypes.string.isRequired,
        Genre: propTypes.shape({
            Name: propTypes.string.isRequired,
            Description: propTypes.string.isRequired
        }).isRequired,
        Director: propTypes.shape({
            Name: propTypes.string.isRequired,
            Bio: propTypes.string.isRequired,
            Birth: propTypes.string.isRequired
        }).isRequired,
    }).isRequired,
    onMovieClick: propTypes.func
};