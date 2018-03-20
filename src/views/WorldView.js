import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'

import Button from 'react-bootstrap/lib/Button';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import chocoImg from '../res/gfx/choco.png';

export default class WorldView extends Component {
  static debugProps() {
    return {
    }
  }

  onRacesClick = () => {
    this.props.app.setView('raceSelection');
  }

  onStablesClick = () => {
    this.props.app.setView('stables');
  }

  render() {
    return (
      <div>
        <div>
          Current Money: {this.props.app.gm.money}
        </div>
        <Button bsStyle='info' onClick={this.onRacesClick}>
          Races <img src={chocoImg} />
        </Button>
        <Button bsStyle='primary' onClick={this.onStablesClick}>
          Stables <img src={chocoImg} />
        </Button>
      </div>
    )
  }
}
