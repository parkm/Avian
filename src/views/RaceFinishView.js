import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './RaceFinishView.css'

import Button from 'react-bootstrap/lib/Button';

import Util from '../Util';

import chocoImg from 'res/gfx/choco.png';

class RaceEventFinish extends Component {
  renderMoneyReward(re) {
    if (!re.rewards.money) return null;
    return (
      <div>Money: {re.rewards.money}</div>
    );
  }

  renderFansReward(re) {
    let fans = re.rewards.fans;
    if (!fans) return null;
    return (
      <div>{fans} {Util.plural(fans, 'fan')}</div>
    );
  }

  renderItemsReward(re) {
    let items = re.rewards.items;
    if (!items) return null;
    return (
      <div>
        {Object.keys(items).map((id) => {
          let itemCount = items[id];
          let item = this.props.app.gm.items[id];
          return (
            <div key={id}>
              {item.name} x{itemCount}
            </div>
          );
        })}
      </div>
    );
  }

  renderUnlocks(re) {
    if (!re.unlocks) return null;
    return (
      <div>
        <h3>New Events</h3>
        <div>
          {re.unlocks.map(eventId => {
            let unlock = this.props.app.gm.raceEvents[eventId];
            return (
              <div key={eventId}>{unlock.name}</div>
            );
          })}
        </div>
      </div>
    );
  }

  render() {
    let re = this.props.raceEvent;
    return (
      <div>
        <h1>
          {re.name} Completed!
        </h1>
        <h3>
          Bonus Reward
        </h3>
        <div>
          {this.renderMoneyReward(re)}
          {this.renderFansReward(re)}
          {this.renderItemsReward(re)}
        </div>
        <div>
          {this.renderUnlocks(re)}
        </div>
      </div>
    );
  }
}

export default class RaceFinishView extends Component {
  constructor() {
    super();
    this.state = {
      moneyEarned: 0,
      moneyTotal: 0
    };
  }

  componentWillMount() {
    this.oldCurrentMoney = this.props.app.gm.money;
    this.raceMoneyReward = this.props.race.getMoneyReward(this.props.playerPlacing);
    this.props.app.gm.onRaceComplete(this.props.race, this.props.playerPlacing);

    this.setState({
      completedEvent: this.props.app.gm.isEventComplete(this.props.race.raceEvent),
      moneyEarned: this.raceMoneyReward,
      moneyTotal: this.oldCurrentMoney
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
      moneyTotal: this.raceMoneyReward + this.oldCurrentMoney
    });
  }

  onContinueClick = () => {
    this.props.app.setView('raceSelection');
  }

  renderItemRewards() {
    let items = this.props.race.rewards['1'].items;
    if (this.props.playerPlacing != 1 || !items) return null;
    return (
      <div>
        <h4>Obtained Items:</h4>
        {Object.keys(items).map((id) => {
          let itemCount = items[id];
          let item = this.props.app.gm.items[id];
          return (
            <div key={id}>
              {item.name} x{itemCount}
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    let fans = this.props.race.getFansReward(this.props.playerPlacing);
    return (
      <div onClick={this.onMainDivClick}>
        <h1>
        Winners
        </h1>
        <h2>
          1st place: {this.props.placings['1'].name}
        </h2>
        {this.props.placings['2'] ? (
          <h3>
            2nd place: {this.props.placings['2'].name}
          </h3>
        ) : null}
        {this.props.placings['3'] ? (
          <h3>
            3rd place: {this.props.placings['3'].name}
          </h3>
        ) : null}
        <div className="race-finish-overlay">
          <h1>You placed {Util.toOrdinal(this.props.playerPlacing)}</h1>
          <div>Earnings: {this.state.moneyEarned}</div>
          <div>Money: {this.state.moneyTotal}</div>
          <div>{fans > 0 ? `You acquired ${fans} ${Util.plural(fans, 'fan')}!` : null}</div>
          {this.renderItemRewards()}
          <Button bsStyle='primary' onClick={this.onContinueClick}>Continue</Button>
          {this.state.completedEvent ? <RaceEventFinish raceEvent={this.props.race.raceEvent} app={this.props.app} /> : null}
        </div>
      </div>
    )
  }
}
