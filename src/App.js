import React, { Component } from 'react';
import MapComponent from './components/MapComponent'
import './App.css';

class App extends Component {


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Strava Segment Finder</h1>
        </header>
        <MapComponent/>
      </div>
    );
  }
}


export default App;
