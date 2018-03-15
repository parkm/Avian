import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

import Button from 'react-bootstrap/lib/Button';

import chocoImg from './res/gfx/choco.png';
import finishImg from './res/gfx/finish.png';

class App extends Component {
  constructor() {
    super();

    this.state = {
      raceFinished: false
    };
  }

  componentWillMount() {
    this.props = {
      racers: this.getRacers(),
    };
  }

  // TODO
  getRacers() {
    return [{
        name: 'player'
      },  {
        name: 'another guy'
      }, {
        name: 'more'
      }, {
        name: 'people'
      }, {
        name: 'test'
      }, {
        name: 'choco'
      }
    ];
  }

  onRaceStart = () => {
    console.log('Race start!')
    this.setState({
      raceFinished: true
    });
  }

  // TODO
  getRacerPercentage(racer) {
    return Math.random() * 100;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Race</h1>
        </header>
        <Button bsStyle="primary" onClick={this.onRaceStart}>Start</Button>
        {this.props.racers.map((racer, i) => {
          return (
            <div key={i} className="race-block">
              <img src={chocoImg} className="sprite choco-racer" style={{left: `${this.getRacerPercentage()}%`}}/>
              <div className="race-line" />
            </div>
          )
        })}
        {this.state.raceFinished ? (
          <div>
            <img src={finishImg} className="race-finish" />
            <Button bsStyle="primary" className="race-finish-button" onClick={this.onRaceStart}>Continue</Button>
          </div>
          ) : null
        }

      </div>
    );
  }
}

export default App;
