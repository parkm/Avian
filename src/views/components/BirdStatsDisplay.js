import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'

import Button from 'react-bootstrap/lib/Button';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

export default class BirdStatsDisplay extends Component {
  render() {
    let stats = this.props.stats;
    let topSpeed = stats.topMph;
    let accel = stats.accel;
    let bsStyle = this.props.bsStyle || null;
    return (
      <ListGroup>
        <ListGroupItem bsStyle={bsStyle}>
          <h4>
            Top Speed
          </h4>
          <div>
            {topSpeed.toFixed(2)} mph
          </div>
        </ListGroupItem>
        <ListGroupItem bsStyle={bsStyle}>
          <h4>
            Stamina
          </h4>
          <div>
            {stats.stamina.toFixed(2)} seconds
          </div>
        </ListGroupItem>
        <ListGroupItem bsStyle={bsStyle}>
          <h4>
            Vigor
          </h4>
          <div>
            {stats.vigor.toFixed(2)}% Stamina per second
          </div>
        </ListGroupItem>
        <ListGroupItem bsStyle={bsStyle}>
          <h4>
            Acceleration
          </h4>
          <div>
            {accel.toFixed(2)} mph per second
          </div>
        </ListGroupItem>
      </ListGroup>
    );
  }
}
