import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './RaceTrackView.css';

import Button from 'react-bootstrap/lib/Button';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

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

  RACER_SPRITE_WIDTH = 120;
  getRacerProgressPercent(racer) {
    let perc = racer.getProgressPercent(this.props.race.length);
    if (perc > 1) perc = 1;
    if (this.cachedRaceBlock) {
      let length = this.cachedRaceBlock.clientWidth;
      return `${(length - this.RACER_SPRITE_WIDTH) * perc}px`;
    } else {
      return '0px';
    }
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
            <div key={i} className="racer-container">
              <div ref={r => this.cachedRaceBlock = r} className="race-block">
                <img src={chocoImg} className="sprite choco-racer" style={{left: this.getRacerProgressPercent(racer)}}/>
                <div className="race-line" />
              </div>
              <div className="racer-container-info">
                <Grid fluid={true}>
                  <Col sm={1}>
                    <h4 className="race-block-name">{racer.name}</h4>
                  </Col>
                  <Col sm={2}>
                    <div className="stamina-bar-wrapper">
                      <ProgressBar active bsStyle="warning" now={racer.getStaminaPercent() * 100} />
                    </div>
                  </Col>
                  <Col sm={2}>
                    <h4>{racer.currentMph.toFixed(2)} MPH</h4>
                  </Col>
                </Grid>
              </div>
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
