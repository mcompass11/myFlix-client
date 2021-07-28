import React, { useState } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import { Link } from "react-router-dom";

export function RegistrationView() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://yourfavoritereels.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        })
            .then(response => {
                const data = response.data;
                //props.onRegister(data);
                // console.log(data);
                window.open('/', '_self'); //_self is necessary so that the page opens in the current tab
            })
            .catch(e => {
                console.log(e);
                console.log('error registering the user');
            });
    };

    return (
        <Form>
            <Col md={3}>
                <Form.Row>
                    <Form.Group md={3} controlId="formGridEmail">
                        <Form.Label>Email: </Form.Label>
                        <Form.Control type="email" placeholder="youremail@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="formGridUsername">
                        <Form.Label>Username: </Form.Label>
                        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formGridPassword">
                        <Form.Label>Password: </Form.Label>
                        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="formGridBirthday">
                        <Form.Label>Birthday: </Form.Label>
                        <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
                    </Form.Group>
                </Form.Row>
                <Button variant="outline-dark" type="submit" onClick={handleSubmit}>Register</Button>
            </Col>
        </Form>
    );
};

RegistrationView.propTypes = {
    Register: propTypes.shape({
        Email: propTypes.string.isRequired,
        Username: propTypes.string.isRequired,
        Password: propTypes.string.isRequired,
        Birthday: propTypes.string.isRequired
    }),
    onRegister: propTypes.func
};