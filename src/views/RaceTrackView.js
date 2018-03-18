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
    this.controller = new RaceController(this.props.race, this.racers, this.props.playerBird);
  }

  raceLoop = () => {
    this.controller.frameUpdate(Date.now() - this.loopStartTime);
    if (this.controller.raceCompleted) {
      this.onRaceFinish();
    }

    this.forceUpdate()
    if (!this.state.raceFinished) {
      this.loopStartTime = Date.now();
      requestAnimationFrame(this.raceLoop);
    }
  }

  onRaceStart = () => {
    console.log('Race start!')

    this.loopStartTime = Date.now();
    requestAnimationFrame(this.raceLoop);
  }

  onRaceSkip = () => {
    this.onRaceFinish();
  }

  onRaceFinish() {
    this.setState({
      raceFinished: true
    });
  }

  onFinishContinue = () => {
    this.props.app.setView('raceFinish', {
      race: this.props.race,
      placings: this.controller.getPlacings(),
      playerPlacing: this.controller.playerRacer.placing
    });
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Race</h1>
        </header>
        <Button bsStyle="primary" onClick={this.onRaceStart}>Start</Button>
        <Button bsStyle="primary" onClick={this.onRaceSkip}>Skip</Button>
        {this.controller.racers.map((racer, i) => {
          return (
            <div key={i} className="race-block">
              <img src={chocoImg} className="sprite choco-racer" style={{left: `${racer.getProgressPercent(this.props.race.length) * 100}%`}}/>
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
