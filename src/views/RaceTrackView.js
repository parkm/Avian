import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css';

import Button from 'react-bootstrap/lib/Button';

import chocoImg from '../res/gfx/choco.png';
import finishImg from '../res/gfx/finish.png';

import RaceController from '../game/RaceController';

export default class RaceTrackView extends Component {
  constructor() {
    super();

    this.state = {
      raceFinished: false
    };
  }

  componentWillMount() {
    this.racers = this.props.race.racers;
    this.controller = new RaceController(this.racers);
  }

  onRaceStart = () => {
    console.log('Race start!')
    this.setState({
      raceFinished: true
    });
  }

  onFinishContinue = () => {
    this.props.app.setView('raceFinish', {
      race: this.props.race,
      winners: {
        '1': {name: 'player'},
        '2': {name: 'choco'},
        '3': {name: 'test'}
      }
    });
  }

  // TODO
  getRacerPercentage(racer) {
    return Math.random() * 100;
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Race</h1>
        </header>
        <Button bsStyle="primary" onClick={this.onRaceStart}>Start</Button>
        {this.racers.map((racer, i) => {
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
            <Button bsStyle="primary" className="race-finish-button" onClick={this.onFinishContinue}>Continue</Button>
          </div>
          ) : null
        }

      </div>
    );
  }
}
