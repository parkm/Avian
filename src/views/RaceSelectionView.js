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
      selectedRace: null
    };
  }

  componentWillMount() {
    this.availableRaces = this.props.app.gm.availableRaces;
  }

  onRaceItemClick = (race) => {
    this.setState({
      selectedRace: race
    });
  }

  onRaceStartClick = () => {
    this.props.app.setView('raceTrack', {
      race: this.state.selectedRace
    });
  }

  onLeaveClick = () => {
    this.props.app.setView('world');
  }

  renderRaceDetails() {
    if (!this.state.selectedRace) return null;
    return (
      <div>
        <div>
          Name: {this.state.selectedRace.name}
        </div>
        <div>
          Reward: {this.state.selectedRace.moneyReward}
        </div>
        <Button bsStyle='primary' onClick={this.onRaceStartClick}>Start</Button>
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
                this.availableRaces.map((r, i) => {
                  return (
                    <ListGroupItem key={i} onClick={_ => this.onRaceItemClick(r)}>{r.name}</ListGroupItem>
                  );
                })
              }
            </ListGroup>
          </Col>
          <Col xs={6} md={4}>
            <h1>
              Race Details
            </h1>
            <div>
              {this.renderRaceDetails()}
            </div>
          </Col>
        </Grid>
        <Button onClick={this.onLeaveClick}>Leave</Button>
      </div>
    )
  }
}
