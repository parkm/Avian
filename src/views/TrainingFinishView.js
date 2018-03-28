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

export default class TrainingFinishView extends Component {
  constructor() {
    super();
  }

  onContinueClick = () => {
    this.props.app.setView('world');
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        Training Completed
        <Button onClick={this.onContinueClick}>Continue</Button>
      </div>
    )
  }
}
