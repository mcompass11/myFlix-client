import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { Link } from "react-router-dom";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies } from '../../actions/actions';

import MovieList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
//import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavView } from '../navbar';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export class MainView extends React.Component { //exposes the component, making available for rest of components

  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onRegister(newData) {
    console.log(newData);
    this.setState({
      userData: newData
    });

    localStorage.setItem('user', JSON.stringify(newData));
    this.getMovies(newData);
  }


  getMovies(token) {
    axios.get('https://yourfavoritereels.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    window.open('/', '_self');
  }



  render() {
    const { movies } = this.props;
    const { user } = this.state;

    return (
      <Router>

        <Col >
          <Button onClick={() => { this.onLoggedOut() }}>Logout</Button>
          <Link to={`/users/${user}`}>
            <Button variant='outline-dark'>{user} Profile</Button>
          </Link>

        </Col>
        <NavView />

        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <MovieList movies={movies} />;
          }} />
          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path={`/users/${user}`} render={({ history }) => {
            if (!user) return <Redirect to="/" />
            return <Col md={8} >
              <ProfileView user={user} movies={movies} onBackClick={() => history.goBack()} />
            </Col>
          }} />

        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}
export default connect(mapStateToProps, { setMovies })(MainView);
