import React from 'react';
import Button from 'react-bootstrap/Button';
import propTypes from 'prop-types';
import { Card } from 'react-bootstrap';

import { Link } from "react-router-dom";
import { NavView } from '../navbar';
export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <>
        <NavView />
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