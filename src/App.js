import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Game from './components/Game'
import NewGame from './components/NewGame'
import logo from './logo.svg'
import './App.css'

function App () {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <SplashPage/>
          </Route>
          <Route exact path="/game">
            <NewGame/>
          </Route>
          <Route exact path="/game/:id">
            <Game/>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

function SplashPage () {
  return (
    <>
      <header className="App-header">
        <strong>Gutterball!</strong>
        <img src={logo} className="App-logo" alt="logo"/>
        <Link to="/game">Get Started!</Link>
      </header>
      <LogoAttribution/>
    </>
  )
}

function LogoAttribution () {
  return (
    <p>Icon made by <strong>Freepik</strong> from <a href="https://www.flaticon.com">www.flaticon.com</a></p>
  )
}

export default App
