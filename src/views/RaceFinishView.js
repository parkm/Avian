import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './RaceFinishView.css'

import Button from 'react-bootstrap/lib/Button';

import Util from '../Util';

import chocoImg from 'res/gfx/choco.png';

export default class RaceFinishView extends Component {
  constructor() {
    super();
    this.state = {
      moneyEarned: 0,
      moneyTotal: 0
    };
  }

  componentWillMount() {
    this.setState({
      moneyEarned: this.props.race.getMoneyReward(this.props.playerPlacing),
      moneyTotal: this.props.app.gm.money
    });

    if (this.props.race.getMoneyReward(this.props.playerPlacing) > 0) {
      this.moneyCountdown = setInterval(_ => {
        let moneyEarned = this.state.moneyEarned-1;
        this.setState({
          moneyEarned: moneyEarned,
          moneyTotal: this.state.moneyTotal+1
        });
        if (moneyEarned <= 0) {
          clearInterval(this.moneyCountdown);
        }
      }, 10)
    }
  }

  onMainDivClick = () => {
    clearInterval(this.moneyCountdown);
    this.setState({
      moneyEarned: 0,
      moneyTotal: this.props.race.getMoneyReward(this.props.playerPlacing) + this.props.app.gm.money
    });
  }

  onContinueClick = () => {
    this.props.app.gm.onRaceComplete(this.props.race, this.props.playerPlacing);
    this.props.app.setView('raceSelection');
  }

  render() {
    return (
      <div onClick={this.onMainDivClick}>
        <h1>
        Winners
        </h1>
        <h2>
          1st place: {this.props.placings['1'].name}
        </h2>
        <h3>
          2nd place: {this.props.placings['2'].name}
        </h3>
        <h3>
          3rd place: {this.props.placings['3'].name}
        </h3>
        <div className="race-finish-overlay">
          <h1>You placed {Util.toOrdinal(this.props.playerPlacing)}</h1>
          <div>Earnings: {this.state.moneyEarned}</div>
          <div>Money: {this.state.moneyTotal}</div>
          <Button bsStyle='primary' onClick={this.onContinueClick}>Continue</Button>
        </div>
      </div>
    )
  }
}
