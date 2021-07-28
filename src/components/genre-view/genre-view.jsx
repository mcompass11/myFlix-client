import React, { useState } from 'react';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';

export class GenreView extends React.Component {
    render() {
        const { genre, onBackClick } = this.props;

        return (

            <div className="genre-view">
                <div>
                    <Card.Title><span className="value">{genre.Name}</span></Card.Title>
                    <Card.Body><span className="value">{genre.Description}</span></Card.Body>
                </div>
                <Button variant="outline-dark" onClick={() => { onBackClick(); }}>Back</Button>
            </div>
        );
    }
}

GenreView.propTypes = {
    genre: propTypes.shape({
        Name: propTypes.string.isRequired,
        Description: propTypes.string.isRequired
    }),
    onMovieClick: propTypes.func
};