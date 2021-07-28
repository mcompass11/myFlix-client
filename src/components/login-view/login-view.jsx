import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); //Sends a request to the server for authentication
        axios.post('https://yourfavoritereels.herokuapp.com/login', {
            Username: username,
            Password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('no such user')
            });

    };


    return (

        <Form>
            <Col md={3}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Enter username" onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control size="lg" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="outline-primary" type="submit" onClick={handleSubmit}>Submit</Button>
                <p> New? Just click the link below!</p>
                <Link to={`/register/`}>
                    <Button variant="outline-dark">Register</Button>
                </Link>
            </Col>
        </Form>
    )
}

// LoginView.propTypes = {
//     login: propTypes.shape({
//         Username: propTypes.string.isRequired,
//         Password: propTypes.string.isRequired
//     }),
//     onLoggedIn: propTypes.func.isRequired,
// };