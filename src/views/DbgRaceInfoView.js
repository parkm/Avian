import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Util from '../Util';

export default class DbgRaceInfoView extends Component {
  constructor() {
    super();
    this.state = {};
  }

  renderRace = (race) => {
    this.money += race.rewards['1'].money || 0;
    return (
      <div>
        {`${race.id} : ${race.name}`}
        <div style={{"margin-left": "64px"}}>
          {`Money: ${this.money}`}
        </div>
      </div>
    );
  }

  renderRaceEvent = (raceEvent) => {
    this.money += raceEvent.rewards.money || 0;
    return (
      <div>
        <div>
          {raceEvent.id}
        </div>
        <div style={{"margin-left": "64px"}}>
          <div>{`Money: ${this.money}`}</div>
          {Object.values(raceEvent.races).map(this.renderRace)}
        </div>
      </div>
    );
  }

  render() {
    console.log(this.props.app.gm);
    this.money = 0;
    return (
      <div style={{"text-align": "left"}}>
        {Object.values(this.props.app.gm.raceEvents).map(this.renderRaceEvent)}
      </div>
    )
  }
}
