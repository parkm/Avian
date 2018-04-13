import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'

import Button from 'react-bootstrap/lib/Button';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Panel from 'react-bootstrap/lib/Panel';

import BirdStatsDisplay from 'views/components/BirdStatsDisplay';
import FeedDisplay from 'views/components/FeedDisplay';

import TrainingGameMaster from 'game/minigames/training/TrainingGameMaster';

export default class TrainingView extends Component {
  constructor() {
    super();
  }

  onLeaveClick = () => {
    if (this.gm.anyProgress()) {
      this.props.app.setView('trainingFinish', {
        trainingResults: this.gm.getResults()
      });
    } else {
      this.props.app.setView('world');
    }
  }

  componentDidMount() {
    this.gm = new TrainingGameMaster(this.canvas);
  }

  render() {
    return (
      <div>
        Training
        <canvas ref={r => this.canvas=r}></canvas>
        <Button onClick={this.onLeaveClick}>Leave</Button>
      </div>
    )
  }
}
