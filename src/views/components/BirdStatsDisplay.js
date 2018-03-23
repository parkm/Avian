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
    return (
      <ListGroup>
        <ListGroupItem>
          <h4>
            Top Speed
          </h4>
          <div>
            {topSpeed} mph
          </div>
        </ListGroupItem>
        <ListGroupItem>
          <h4>
            Stamina
          </h4>
          <div>
            {stats.stamina} seconds
          </div>
        </ListGroupItem>
        <ListGroupItem>
          <h4>
            Vigor
          </h4>
          <div>
            {stats.vigor}% Stamina per second
          </div>
        </ListGroupItem>
        <ListGroupItem>
          <h4>
            Acceleration
          </h4>
          <div>
            {accel} mph per second
          </div>
          <div>
            0 to {topSpeed} mph in {Number(topSpeed / accel).toFixed(2)} seconds
          </div>
          <div>
            0 to 60 mph in {Number(60 / accel).toFixed(2)} seconds
          </div>
        </ListGroupItem>
      </ListGroup>
    );
  }
}
