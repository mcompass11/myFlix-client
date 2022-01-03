import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (

      <Card>
        <Card.Body>
          <Card.Title>{genre.Name}</Card.Title>
          <Card.Text>{genre.Description}</Card.Text>
        </Card.Body>

        <Button variant="outline-dark" onClick={() => { onBackClick(); }}>Back</Button>
      </Card>
    );
  }
}