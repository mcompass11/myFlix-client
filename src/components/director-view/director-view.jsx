import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (

      <Card>
        <Card.Img variant="top" src={director.Image} />
        <Card.Body>
          <Card.Title>{director.Name}</Card.Title>
          <Card.Text>{director.Bio}</Card.Text>
          <Card.Text>{director.Birth} - {director.Death}</Card.Text>
        </Card.Body>

        <Button variant="outline-dark" onClick={() => { onBackClick(); }}>Back</Button>
      </Card>
    )
  }
}
