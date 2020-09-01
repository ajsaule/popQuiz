import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import NavBar from './components/NavBar';
import InfoSplash from './components/InfoSplash';
import PlayGame from './components/PlayGame';
import './components/NavBar.css';
import './components/InfoSplash.css';
import './components/PlayGame.css';
import './App.css';
//import { Route, Router } from 'react-router';

function Home() {
  return (
    <div>Home works</div>
  )
}

function Login() {
  return (
      <div>Login works</div>
    )
}

function Signup() {
  return (
    <div>Signup works</div>
    )
}

function Quizzes() {
  return (
    <div>quizzes working</div>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />

        <Switch>
          
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/playgame">
            <PlayGame />
          </Route>
          <Route path="/quizzes">
            <Quizzes />
          </Route>
          <Route path="/">
            <InfoSplash />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
