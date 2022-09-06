import React, { Component } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { Row } from 'react-bootstrap';

import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';

export class ProfileView extends Component {

  constructor() {
    super();
    this.state = {
      Username: null,
      Email: null,
      Birthday: null,
      Password: null,
      FavoriteMovies: [],
    };
  }


  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  getUser(token) {
    const Username = localStorage.getItem('user');

    axios.get(`https://yourfavoritereels.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          Username: response.data.Username,
          Email: response.data.Email,
          Password: response.data.Password,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(err => {
        console.error(err);
      })
  }

  setUsername(value) {
    this.setState({
      Username: value
    });
  } // extracts and sets Username from user object

  setEmail(value) {
    this.setState({
      Email: value
    });
  } // extracts and sets Email from user object

  setPassword(value) {
    this.setState({
      Password: value
    });
  } // extracts and sets Password from user object

  setBirthday(value) {
    this.setState({
      Birthday: value
    });
  } // extracts and sets Birthday from user object

  updateUser = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.put(`https://yourfavoritereels.herokuapp.com/users/${Username}`,
      {
        Username: this.state.Username,
        Email: this.state.Email,
        Password: this.state.Password,
        Birthday: this.state.Birthday,
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Email: response.data.Email,
          Password: response.data.Password,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem('user', this.state.Username);
        alert('User profile update success!');
        window.open('/profile', '_self');
      });
  }; //updates user profile

  removeFavoriteMovie = (e, movie) => {
    e.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://yourfavoritereels.herokuapp.com/users/${Username}/movies/${movie._id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        console.log(response);
        alert('Movie no longer in favorites.');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }; //removes movie from user favorites

  deleteUser() {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://yourfavoritereels.herokuapp.com/users/${Username}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        console.log(response);
        alert('User profile deleted.');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/', '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }; //deletes the user profile



  render() {
    const { movies } = this.props;
    const { Username, Email, Birthday, FavoriteMovies } = this.state;

    const favoriteMovies = movies.filter((m) => FavoriteMovies.includes(m._id)) || [];

    if (!Username) {
      return null;
    }

    return (
      <>
        <div className="profile-view">
          <h1>Hello, {Username}</h1>
          <h2>Current Info:</h2>
          <p>Username: {Username} </p>
          <p>Email: {Email} </p>
          <p>Birthday: {Birthday} </p>

          <h2>Update Info Below</h2>
          <Form
            onSubmit={(e) => this.updateUser(
              e,
              this.Username,
              this.Password,
              this.Email,
              this.Birthday
            )}
          >

            <Form.Group className="input-wrap">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" name="Username" placeholder="New Username"
                onChange={(e) => this.setUsername(e.target.value)} required
              />
              <div id="user" className="error"></div>
            </Form.Group>

            <Form.Group className="input-wrap">
              <Form.Label>Password:</Form.Label>
              <Form.Control name="Password" type="password" placeholder="New Password"
                onChange={(e) => this.setPassword(e.target.value)} required
              />
              <div id="pass" className="error"></div>
            </Form.Group>

            <Form.Group className="input-wrap">
              <Form.Label>Email:</Form.Label>
              <Form.Control name="Email" type="email" placeholder="New Email"
                onChange={(e) => this.setEmail(e.target.value)} required
              />
              <div id="email-err" className="error"></div>
            </Form.Group>

            <Form.Group className="input-wrap">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control name="Birthday" type="date"
                onChange={(e) => this.setBirthday(e.target.value)} />
              <div id="Date" className="error"></div>
            </Form.Group>

            <div className="middle">
              <Button className="m-3 bttn" type='submit' onClick={this.updateUser}>Update</Button>
              <Link to={`/`}>
                <Button className="m-3 bttn">Go Home</Button>
              </Link>
              <Button className="m-3 bttn" onClick={() => { this.deleteUser(); }}>Delete Account</Button>
            </div>
          </Form>

          <h2>Favorite Movies:</h2>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  {favoriteMovies.length === 0 && (
                    <div>No favorite movies chosen</div>
                  )}
                  <Row>
                    {favoriteMovies.map((movie) => (
                      <Card key={movie._id} >
                        <Card.Img
                          variant='top'
                          src={movie.ImagePath}
                        />
                        <Card.Body>
                          <Card.Title className='movie-title'>
                            {movie.Title}
                          </Card.Title>
                          <Button value={movie._id} onClick={(e) => this.removeFavoriteMovie(e, movie)}>Remove Movie</Button>
                        </Card.Body>
                      </Card>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

ProfileView.propTypes = {
  movies: propTypes.arrayOf(propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    ImagePath: propTypes.string.isRequired,
    Genre: propTypes.shape({
      Name: propTypes.string.isRequired,
      Description: propTypes.string.isRequired
    }),
    Director: propTypes.shape({
      Name: propTypes.string.isRequired,
      Bio: propTypes.string.isRequired,
      Birth: propTypes.string.isRequired
    }),
  })),
  onMovieClick: propTypes.func
};