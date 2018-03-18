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
    return (
      <div>
        <div>
          Name: {this.state.selectedBird.name}
        </div>
        <div>
          Speed: {this.state.selectedBird.stats.topMph} MPH
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
