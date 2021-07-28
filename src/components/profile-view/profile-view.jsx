import React from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';

export class ProfileView extends React.Component {

    render() {
        const { user } = this.props;

        // function updateInfo(token) {
        //     const newName2 = document.getElementById('Username');
        //     const newPW2 = document.getElementById('Password');
        //     const newEmail2 = document.getElementById('Email');
        //     const newBirthday2 = document.getElementById('Birthday');

        //     if (newName2.value.length < 5) {
        //         const error = document.getElementById('Username');
        //         return error.innerText = "Username has to be at least 5 characters";
        //     }

        //     const newName = userInput.value || Username;
        //     let newPW = null;
        //     if (password.value == "") {
        //         newPW = "";
        //     } else {
        //         newPW = Password.value;
        //     }
        //     const Email = newEmail.value || Email;
        //     const Birthday = newBirthday.value || Birthday;

        const handleUpdate = (e) => {
            e.preventDefault();
            axios.put('https://yourfavoritereels.herokuapp.com/user/:Username',
                {
                    Username: newName,
                    Password: newPW,
                    Email: newEmail,
                    Birthday: newBirthday
                },
                /*{ headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } }*/
            )
                .then(response => {
                    console.log('Success with updating account information');
                    let userData = response.data;
                    onNewUser(userData);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };

        // function deleteAcct(token) {
        //     console.log('Not deleted yet');
        //     axios.delete('https://yourfavoritereels.herokuapp.com/users/:Username',
        //                 /*{ headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } }*/)
        //         .then(response => {
        //             console.log(response);
        //             console.log(`${user} has been deleted`);
        //         })
        //         .catch(e => {
        //             console.log('There is an error');
        //             console.log(e);
        //         })
        // }
        return (
            <>
                <div className="centerProfile">
                    <h1 className="title my-4">Hello,</h1>
                    <h2 className="title-2 my-4">Current Information</h2>
                    <div className="align-text-left">
                        <div className=" my-2"><strong>Username: {Username}</strong></div>
                        <div className=" my-2"><strong>Email:</strong> {Email}</div>
                        <div className=" my-2"><strong>Date of Birth:</strong> {Birthday}</div>
                    </div>
                    <h2 className="title-2 my-4">Update Information</h2>
                    <form noValidate className="form">

                        <div className="input-wrap">
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" placeholder="New Username" />
                            <div id="user" className="error"></div>
                        </div>

                        <div className="input-wrap">
                            <label htmlFor="password">Password:</label>
                            <input id="password" type="password" placeholder="New Password" />
                            <div id="pass" className="error"></div>
                        </div>

                        <div className="input-wrap">
                            <label htmlFor="password Verification">Verify Password:</label>
                            <input id="passwordVer" type="password" placeholder="Verify Password Change" />
                            <div id="passVer" className="error"></div>
                        </div>

                        <div className="input-wrap">
                            <label htmlFor="email">Email:</label>
                            <input id="email" type="email" placeholder="New Email" />
                            <div id="email-err" className="error"></div>
                        </div>

                        {/* <div className="input-wrap">
                            <label htmlFor="DOB">Date of Birth:</label>
                            <input id="DOB" type="Date" />
                            <div id="Date" className="error"></div>
                        </div> */}

                        <div className="middle">
                            <Button className="m-3 bttn" variant="info" type="button" onClick={() => { updateInfo(token) }}>Update</Button>
                            <Link to={`/`}>
                                <Button className="m-3 bttn" variant="info" type="button">Go Back</Button>
                            </Link>
                            <Button className="m-3 bttn" variant="info" type="button" onClick={() => { deleteAcct(token); onSignOut(null); history.push('/'); }}>Delete Account</Button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

// export class ProfileView extends React.Component {
//     render() {
//         const { users, email, username, password, birthday, favoriteMovies, newUserData, newUser, onBackClick } = this.props;

//         function updateUser(newUser) {
//             let user = document.getElementById('username');
//             let PW = document.getElementById('password');
//             let mail = document.getElementById('email');
//             let birth = document.getElementById('birthday');

//             const newEmail = mail.value || email.Email;
//             const newBirth = birth.value || birthday.Birthday;
//             const newName = user.value || username.Username;
//             const newPass = PW.value || password.Password;

//             axios.put(`https://yourfavoritereels.herokuapp.com/users/${user}`,
//                 { Username: newName, Password: newPass, Email: newEmail, Birthday: newBirth },
//                 { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${newUser}` } }
//             )
//                 .then(response => {
//                     console.log('Updated!');
//                     let addedData = response.data;
//                     newUserData(addedData);
//                 })
//                 .catch(function (error) {
//                     console.log(e, error);
//                 })
//         }


//         return (
//             <Form>
//                 <Col md={3}>
//                     <Form.Row>
//                         <Form.Group md={3} controlId="formGridEmail">
//                             <Form.Label>Email: </Form.Label>
//                             <Form.Control type="email" placeholder={users} value={email} onChange={e => setEmail(e.target.value)} />
//                         </Form.Group>
//                     </Form.Row>
//                     <Form.Row>
//                         <Form.Group controlId="formGridUsername">
//                             <Form.Label>Username: </Form.Label>
//                             <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
//                         </Form.Group>
//                         <Form.Group controlId="formGridPassword">
//                             <Form.Label>Password: </Form.Label>
//                             <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
//                         </Form.Group>
//                     </Form.Row>
//                     <Form.Row>
//                         <Form.Group controlId="formGridBirthday">
//                             <Form.Label>Birthday: </Form.Label>
//                             <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
//                         </Form.Group>
//                     </Form.Row>
//                     <Form.Row>
//                         <Form.Group controlId="formGridMovies">
//                             <Form.Label>Favorite Movies: </Form.Label>
//                             <Form.Control type="favorites" value={favoriteMovies} onChange={e => setFavoriteMovies(e.target.value)} />
//                         </Form.Group>
//                     </Form.Row>
//                     <Button variant="outline-dark" type="submit" /*onClick={handleUpdate}*/ onClick={() => { updateUser(newUser) }}>Update</Button>
//                     <Button variant="outline-dark" onClick={() => { onBackClick(null); }}>Back</Button>
//                 </Col>
//             </Form >
//         );
//     }
// }

ProfileView.propTypes = {
    user: propTypes.shape({
        Username: propTypes.string.isRequired,
        Email: propTypes.string.isRequired,
        Password: propTypes.string.isRequired,
        Birthday: propTypes.string.isRequired,
        FavoriteMovies: propTypes.string.isRequired
    }),
    onRegister: propTypes.func
};



{/* <Form>
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
                    <Form.Row>
                        <Form.Group controlId="formGridMovies">
                            <Form.Label>Favorite Movies: </Form.Label>
                            <Form.Control type="favorites" value={favoriteMovies} onChange={e => setFavoriteMovies(e.target.value)} />
                        </Form.Group>
                    </Form.Row>
                    <Button variant="outline-dark" type="submit" onClick={handleUpdate}>Update</Button>
                </Col>
            </Form> */}