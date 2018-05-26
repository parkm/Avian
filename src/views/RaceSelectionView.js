import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './RaceSelectionView.css';

import Button from 'react-bootstrap/lib/Button';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Util from '../Util'

import chocoImg from 'res/gfx/choco.png';

class RaceEventButton extends Component {
  componentWillMount() {
    this.failedConditions = this.props.gm.getFailedRaceEventConditions(this.props.raceEvent);
    this.isRestricted = Object.values(this.failedConditions).some(x => x == false);
  }

  renderItemRewards(itemCountMap) {
    let out = [];
    for (let id in itemCountMap) {
      let itemCount = itemCountMap[id];
      let item = this.props.gm.items[id];
      out.push((
        <div key={id}>
          {item.name} x{itemCount}
        </div>
      ));
    }
    return out;
  }

  renderRestrictions(restrict) {
    if (Object.keys(restrict).length === 0) {
      return (<div>None</div>);
    }

    let renderOut = [];
    let fails = this.failedConditions;
    let append = (key, passed, children) => {
      renderOut.push(
        <div key={key} className={passed ? 'race-event-restriction' : 'race-event-restriction-failed'}>
          {children}
        </div>
      );
    };

    if (restrict.fans) {
      append('fans', fails.fans, (
        <div>{restrict.fans} {Util.plural(restrict.fans, 'fan')}</div>
      ))
    }

    return (<div>{renderOut}</div>);
  }

  render() {
    let raceCount = Object.keys(this.props.raceEvent.races).length;
    let fans = this.props.raceEvent.rewards.fans;
    let restrict = this.props.raceEvent.restrictions;
    return (
      <Button disabled={this.isRestricted} bsClass="btn btn-default race-event-btn" onClick={this.props.onClick}>
        <h1>
          {this.props.raceEvent.name}
        </h1>
        <Grid fluid={true}>
          <Col sm={4}>
            <div>
              Rewards
            </div>
            <div>
              <div>
                ${this.props.raceEvent.rewards.money}
              </div>
              {fans > 0 ? `${fans} ${Util.plural(fans, 'fan')}` : null}
              {this.renderItemRewards(this.props.raceEvent.rewards.items)}
            </div>
          </Col>
          <Col sm={4}>
            {raceCount} {raceCount === 1 ? 'Race' : 'Races'}
          </Col>
          <Col sm={4}>
            <div>
              Restrictions
            </div>
            {this.renderRestrictions(restrict)}
          </Col>
        </Grid>
      </Button>
    );
  }
}

export default class RaceSelectionView extends Component {
  constructor() {
    super();
    this.state = {
      selectedEvent: null,
      selectedRace: null,
      playerBird: null
    };
  }

  componentWillMount() {
    this.gm = this.props.app.gm;
    this.events = this.gm.getUnlockedEvents();
    this.playerBirds = this.gm.ownedBirds;
  }

  onRaceItemClick = (race) => {
    this.setState({
      selectedRace: race
    });
  }

  onEventItemClick = (event) => {
    this.setState({
      selectedEvent: event,
      selectedRace: null,
      playerBird: null
    });
  }

  onRaceStartClick = () => {
    this.props.app.setView('raceTrack', {
      race: this.state.selectedRace,
      playerBird: this.state.playerBird
    });
  }

  onLeaveClick = () => {
    this.props.app.setView('world');
  }

  onPlayerBirdItemClick = (bird) => {
    this.setState({
      playerBird: bird
    });
  }

  renderItemRewards(itemCountMap) {
    let out = [];
    for (let id in itemCountMap) {
      let itemCount = itemCountMap[id];
      let item = this.props.app.gm.items[id];
      out.push((
        <div key={id}>
          {item.name} x{itemCount}
        </div>
      ));
    }
    return out;
  }

  renderRaceDetails() {
    if (!this.state.selectedRace) return null;
    let fans = this.state.selectedRace.getFansReward('1');
    return (
      <div>
        <h1>
          Race Details
        </h1>
        <div>
          Name: {this.state.selectedRace.name}
        </div>
        <div>
          {this.state.selectedRace.length} {this.state.selectedRace.length == 1 ? 'Mile' : 'Miles'}
        </div>
        <div style={{border: '1px solid black'}}>
          <h4>Rewards</h4>
          <div>
            ${this.state.selectedRace.getMoneyReward('1')}
          </div>
          {fans > 0 ? `${fans} ${Util.plural(fans, 'fan')}` : null}
          {this.renderItemRewards(this.state.selectedRace.rewards['1'].items)}
        </div>
      </div>
    );
  }

  renderEventDetails() {
    if (!this.state.selectedEvent) return null;
    return (
      <div>
        <h1>
          {this.state.selectedEvent.name}
        </h1>
        <div>
          Reward: {this.state.selectedEvent.rewards.money}
        </div>
      </div>
    );
  }

  renderEventSelection() {
    return (
      <div>
        <h1>Race Events</h1>
        {
          Object.values(this.events).map((e, i) => {
            return (
              <RaceEventButton key={i} gm={this.props.app.gm} onClick={_ => this.onEventItemClick(e)} raceEvent={e} />
            );
          })
        }
        <div>
          <Button onClick={this.onLeaveClick}>Leave</Button>
        </div>
      </div>
    );
  }

  renderRaceSelection() {
    return (
      <div>
        <Grid>
          <Col xs={12} md={8}>
            <h2>Select a Race</h2>
            <ListGroup>
              {
                Object.values(this.state.selectedEvent.races).map((r, i) => {
                  return (
                    <ListGroupItem key={i} onClick={_ => this.onRaceItemClick(r)}>
                      {this.gm.isRaceComplete(r) ? '✔' : null}
                      {r.name}
                    </ListGroupItem>
                  );
                })
              }
            </ListGroup>
            <h2>Select a Bird</h2>
            <ListGroup>
              {
                this.playerBirds.map((b, i) => {
                  return (
                    <ListGroupItem key={i} onClick={_ => this.onPlayerBirdItemClick(b)}>{b.name}</ListGroupItem>
                  );
                })
              }
            </ListGroup>
          </Col>
          <Col xs={6} md={4}>
            {this.state.selectedRace ? this.renderRaceDetails() : this.renderEventDetails()}
          </Col>
        </Grid>
        <Button onClick={_ => this.setState({selectedEvent: null})}>Back</Button>
        {this.state.selectedRace && this.state.playerBird ? (<Button bsStyle='primary' onClick={this.onRaceStartClick}>Start</Button>) : null}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.selectedEvent ? this.renderRaceSelection() : this.renderEventSelection()}
      </div>
    )
  }
}
