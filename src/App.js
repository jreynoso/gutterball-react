import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="http://dispassionproject.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gutterball!!!
        </a>
      </header>
      <LogoAttribution/>
    </div>
  );
}

function LogoAttribution() {
  return (
    <p>Icon made by <strong>Freepik</strong> from <a href="https://www.flaticon.com">www.flaticon.com</a></p>
  )
}

export default App;
