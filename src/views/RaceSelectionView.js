import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './RaceSelectionView.css';

import Button from 'react-bootstrap/lib/Button';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import chocoImg from 'res/gfx/choco.png';

class RaceEventButton extends Component {
  render() {
    let raceCount = Object.keys(this.props.raceEvent.races).length;
    return (
      <Button bsClass="btn btn-default race-event-btn" onClick={this.props.onClick}>
        <h1>
          {this.props.raceEvent.name}
        </h1>
        <Grid fluid={true}>
          <Col sm={4}>
            <div>
              Rewards
            </div>
            <div>
              {this.props.raceEvent.rewards.money}
            </div>
          </Col>
          <Col sm={4}>
            {raceCount} {raceCount === 1 ? 'Race' : 'Races'}
          </Col>
          <Col sm={4}>
            <div>
              Restrictions
            </div>
            <div>
              None
            </div>
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
    this.events = this.props.app.gm.getUnlockedEvents();
    this.playerBirds = this.props.app.gm.ownedBirds;
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

  renderRaceDetails() {
    if (!this.state.selectedRace) return null;
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
        <div>
          Reward: {this.state.selectedRace.getMoneyReward('1')}
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
              <RaceEventButton key={i} onClick={_ => this.onEventItemClick(e)} raceEvent={e} />
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
                    <ListGroupItem key={i} onClick={_ => this.onRaceItemClick(r)}>{r.name}</ListGroupItem>
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
