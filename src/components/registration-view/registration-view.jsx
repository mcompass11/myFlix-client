import React, { useState } from 'react';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

export function RegistrationView(props) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, username, password, birthday);
        props.onRegister(username);
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
                <Button variant="outline-dark" type="submit" onClick={handleSubmit}>Submit</Button>
            </Col>
        </Form>
    );
};

RegistrationView.propTypes = {
    register: propTypes.shape({
        Email: propTypes.string.isRequired,
        Username: propTypes.string.isRequired,
        Password: propTypes.string.isRequired,
        Birthday: propTypes.string.isRequired
    }).isRequired,
    onRegister: propTypes.func.isRequired,
};