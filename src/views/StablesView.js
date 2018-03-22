import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'

import Button from 'react-bootstrap/lib/Button';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import chocoImg from '../res/gfx/choco.png';

export default class StablesView extends Component {
  static debugProps() {
    return {
    }
  }

  constructor() {
    super();
    this.state = {
      selectedBird: null
    };
  }

  componentWillMount() {
    this.birds = this.props.app.gm.ownedBirds;
  }

  onBirdItemClick = (bird) => {
    this.setState({
      selectedBird: bird
    });
  }

  onLeaveClick = () => {
    this.props.app.setView('world');
  }

  renderBirdDetails() {
    if (!this.state.selectedBird) return null;
    let topSpeed = this.state.selectedBird.stats.topMph;
    let accel = this.state.selectedBird.stats.accel;
    return (
      <div>
        <div>
          Name: {this.state.selectedBird.name}
        </div>
        <div>
          Top Speed: {topSpeed} MPH
        </div>
        <div>
          Stamina: Maintains sprint for {this.state.selectedBird.stats.stamina} seconds
        </div>
        <div>
          Vigor: Regenerates {this.state.selectedBird.stats.vigor}% of stamina per second
        </div>
        <div>
          Acceleration: {accel} MPH gained per second
        </div>
        <div>
          0 to {topSpeed} MPH: {Number(topSpeed / accel).toFixed(2)} seconds
        </div>
        <div>
          0 to 60 MPH: {Number(60 / accel).toFixed(2)} seconds
        </div>
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
                this.birds.map((b, i) => {
                  return (
                    <ListGroupItem key={i} onClick={_ => this.onBirdItemClick(b)}>{b.name}</ListGroupItem>
                  );
                })
              }
            </ListGroup>
          </Col>
          <Col xs={6} md={4}>
            <h1>
              Bird Details
            </h1>
            <div>
              {this.renderBirdDetails()}
            </div>
          </Col>
        </Grid>
        <Button onClick={this.onLeaveClick}>Leave</Button>
      </div>
    )
  }
}
