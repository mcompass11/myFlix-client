import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        /* Send a request to the server for authentication
        then call props.onLoggedIn(username) */
        props.onLoggedIn(username);
    };

    return (
        <Form>
            <Col md={3}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control size="lg" type="email" value={username} onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control size="lg" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="outline-dark" type="submit" onClick={handleSubmit}>Submit</Button>
            </Col>
        </Form>
    );
}