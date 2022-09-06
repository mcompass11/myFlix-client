import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import propTypes from 'prop-types';
import { Card } from 'react-bootstrap';

import { Link } from "react-router-dom";
export class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FavoriteMovies: [],
    }
  }

  addToFavorites = (movie) => {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    let url = `https://yourfavoritereels.herokuapp.com/users/${Username}/movies/${movie._id}`;
    axios.post(url, '',
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        console.log(response);
        alert(`${movie.Title} has been added.`)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <>
        <Card>
          <Card.Img variant="top" src={movie.ImagePath} />

          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
          </Card.Body>

          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>

          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>

          <Button onClick={() => { this.addToFavorites(movie) }}>Add to my favorites</Button>

          <Button onClick={() => { onBackClick() }}>Back</Button>
        </Card>
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