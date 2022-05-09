import React, { useState } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';

import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

export function RegistrationView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      //Send request to the server for authentication
      axios.post('https://yourfavoritereels.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          alert('You have successfully registered!');
          window.open('/', '_self'); //keeps the page to be opened in the same tab
          console.log(data);
        })
        .catch(e => {
          console.log('error creating profile');
          alert('Registration unsuccessful')
        });
    }
  };

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPassword('Passsword must be 6 characters long');
      isReq = false;
    }
    if (!email) {
      setEmailErr('Email Required');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmail('Email must have "@" symbol');
      isReq = false;
    }
    return isReq;
  };

  return (
    <Form>
      <Form.Group controlId="formUsername" className="reg-form-inputs">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
        {values.usernameErr && <p>{values.usernameErr}</p>}
      </Form.Group>

      <Form.Group controlId="formPassword" className="reg-form-inputs">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {values.passwordErr && <p>{values.passwordErr}</p>}
      </Form.Group>

      <Form.Group controlId="Email" className="reg-form-inputs">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
        {values.emailErr && <p>{values.emailErr}</p>}
      </Form.Group>

      <Form.Group controlId="updateBirthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control type="date" name="birthday" onChange={e => setBirthday(e.target.value)} />
      </Form.Group>

      <button variant="primary" type="register" onClick={handleSubmit}>Register</button>
      <p>Account holder already? Click <Link to="/" >ME</Link>!</p>

    </Form>
  );
};