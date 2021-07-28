import React from 'react';
import propTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


export class DirectorView extends React.Component {
    render() {
        const { director, onBackClick } = this.props;

        return (

            <div className="director-view">
                <div>
                    <Card.Title><span>{director.Name}</span></Card.Title>
                    <Card.Body><span>Bio: {director.Bio}</span></Card.Body>
                    <Card.Body><span>Born: {director.Birth}</span></Card.Body>
                    <Card.Body><span>Died: {director.Death}</span></Card.Body>
                </div>
                <Button variant="outline-dark" onClick={() => { onBackClick(); }}>Back</Button>
            </div>
        )
    }
}

DirectorView.propTypes = {
    director: propTypes.shape({
        Name: propTypes.string.isRequired,
        Bio: propTypes.string.isRequired,
        Birth: propTypes.string.isRequired,
        Death: propTypes
    }).isRequired,
    onBackClick: propTypes.func.isRequired
};
