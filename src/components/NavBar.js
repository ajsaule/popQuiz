import React, { Component } from 'react'
// import { Route, Router } from 'react-router'; //do I need this? 
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

// // function just takes you home to spash page or your card collection 
// function goHome() {
//     return (

//     )
// }

export default class NavBar extends Component {

    state = {
        username: '',
        password: ''
    }

    render() {
        return (
            <nav className="nav-bar">
                <Link to="/">
                <img className="logo-img" src={require("./pop-quiz.png")} alt="Logo" />
                </Link>
                <Link to="/quizzes">Quizzes</Link>
                <div>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                    {/* If logged in/ session is active */}
                    <Link to="/playgame">New game</Link>
                </div>
            </nav>
        )
    }
}