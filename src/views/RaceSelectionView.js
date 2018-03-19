import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css';

import Button from 'react-bootstrap/lib/Button';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import chocoImg from '../res/gfx/choco.png';

export default class RaceSelectionView extends Component {
  static debugProps() {
    return {
    }
  }

  constructor() {
    super();
    this.state = {
      selectedEvent: null,
      selectedRace: null,
      playerBird: null
    };
  }

  componentWillMount() {
    this.events = this.props.app.gm.raceEvents;
    this.playerBirds = this.props.app.gm.ownedBirds;
  }

  onRaceItemClick = (race) => {
    this.setState({
      selectedRace: race,
      playerBird: null
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
        <div>
          Name: {this.state.selectedRace.name}
        </div>
        <div>
          Reward: {this.state.selectedRace.getMoneyReward('1')}
        </div>
        <ListGroup>
          {
            this.playerBirds.map((b, i) => {
              return (
                <ListGroupItem key={i} onClick={_ => this.onPlayerBirdItemClick(b)}>{b.name}</ListGroupItem>
              );
            })
          }
        </ListGroup>
        {this.state.playerBird ? (<Button bsStyle='primary' onClick={this.onRaceStartClick}>Start</Button>) : null}
      </div>
    );
  }

  renderEventDetails() {
    if (!this.state.selectedEvent) return null;
    return (
      <div>
        <div>
          Name: {this.state.selectedEvent.name}
        </div>
        <div>
          Reward: {this.state.selectedEvent.rewards.money}
        </div>
        <ListGroup>
          {
            Object.values(this.state.selectedEvent.races).map((r, i) => {
              return (
                <ListGroupItem key={i} onClick={_ => this.onRaceItemClick(r)}>{r.name}</ListGroupItem>
              );
            })
          }
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Grid>
          <Col xs={12} md={8}>
            <ListGroup>
              {
                Object.values(this.events).map((e, i) => {
                  return (
                    <ListGroupItem key={i} onClick={_ => this.onEventItemClick(e)}>{e.name}</ListGroupItem>
                  );
                })
              }
            </ListGroup>
          </Col>
          <Col xs={6} md={4}>
            <Row>
              <h1>
                Event Details
              </h1>
              <div>
                {this.renderEventDetails()}
              </div>
            </Row>
            <Row>
              <h1>
                Race Details
              </h1>
              <div>
                {this.renderRaceDetails()}
              </div>
            </Row>
          </Col>
        </Grid>
        <Button onClick={this.onLeaveClick}>Leave</Button>
      </div>
    )
  }
}
