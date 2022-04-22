import React, { Component } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';
import { NavView } from '../navbar';

export class ProfileView extends Component {
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
    }
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        users: localStorage.getItem('users')
      });
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    axios.get('https://yourfavoritereels.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies, onBackClick } = this.props;
    const { Username, Password, Email, Birthday, FavoriteMovies } = this.state;
    console.log(Email)

    /* Below is where I am having trouble accessing my user info. I would like to 
    access the values for each key in the user object from the api but through my several attempts 
    I have only been able to access the username*/
    return (
      <>
        <NavView />
        <div className="profile-view">
          <h1>Hello, { }</h1>
          <h2>Current Info:</h2>
          <p>Username:{ } </p>
          <p>Password: { } </p>
          <p>Email: {Email} </p>
          <p>Birthday: { } </p>

          <h2>Favorite Movies:</h2>
        </div>

        <h2>Update Info Below</h2>
        <Form>

          <div className="input-wrap">
            <label>Username:</label>
            <input type="text" id="username" placeholder="New Username" />
            <div id="user" className="error"></div>
          </div>

          <div className="input-wrap">
            <label>Password:</label>
            <input id="password" type="password" placeholder="New Password" />
            <div id="pass" className="error"></div>
          </div>

          <div className="input-wrap">
            <label>Verify Password:</label>
            <input id="passwordVer" type="password" placeholder="Verify Password" />
            <div id="passVer" className="error"></div>
          </div>

          <div className="input-wrap">
            <label>Email:</label>
            <input id="email" type="email" placeholder="New Email" />
            <div id="email-err" className="error"></div>
          </div>

          <div className="input-wrap">
            <label>Date of Birth:</label>
            <input id="DOB" type="Date" />
            <div id="Date" className="error"></div>
          </div>

          <div className="middle">
            <Button className="m-3 bttn">Update</Button>
            <Link to={`/`}>
              <Button className="m-3 bttn">Go Back</Button>
            </Link>
            <Button className="m-3 bttn" onClick={() => { onBackClick(); }}>Delete Account</Button>
          </div>
        </Form>
      </>
    );
  }
}

// ProfileView.propTypes = {
//   users: propTypes.shape({
//     Username: propTypes.string.isRequired,
//     Email: propTypes.string.isRequired,
//     Password: propTypes.string.isRequired,
//     Birthday: propTypes.string.isRequired,
//     FavoriteMovies: propTypes.array
//   }),
//   onRegister: propTypes.func
// };