import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './RaceTrackView.css';

import Button from 'react-bootstrap/lib/Button';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/lib/ToggleButton';

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

  RACER_SPRITE_WIDTH = 110;
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

  onMovementChange = (movement) => {
    this.controller.playerRacer.setMovement(movement);
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <Button bsStyle="primary" onClick={this.onRaceStart}>Start</Button>
          <Button bsStyle="primary" onClick={this.onRaceSkip}>Skip</Button>
        </header>

        {this.controller.racers.map((racer, i) => {
          return (
            <div key={i} className="racer-container">
              <div ref={r => this.cachedRaceBlock = r} className="race-block">
                <div className="sprite choco-racer" style={{left: this.getRacerProgressPercent(racer)}}/>
                <div className="race-line" />
              </div>
              <div className="racer-container-info">
                <Grid fluid={true}>
                  <Col sm={1}>
                    <h4 className="race-block-name">{racer.name}</h4>
                  </Col>
                  <Col sm={2}>
                    <div className="stamina-bar-wrapper">
                      <ProgressBar active bsStyle="warning" now={racer.getStaminaPercent()} min={0} max={1} />
                    </div>
                  </Col>
                  <Col sm={2}>
                    <h4>{racer.currentMph.toFixed(2)} MPH</h4>
                  </Col>
                  <Col sm={3}>
                    {racer.isPlayer ? (
                      <div>
                        <ButtonToolbar>
                          <ToggleButtonGroup onChange={this.onMovementChange}type="radio" name="movement" value={this.controller.playerRacer.movement}>
                            <ToggleButton value={'trot'}>Trot</ToggleButton>
                            <ToggleButton value={'sprint'}>Sprint</ToggleButton>
                          </ToggleButtonGroup>
                        </ButtonToolbar>
                      </div>
                    ) : null}
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
