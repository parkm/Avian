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
import BirdSelect from 'views/components/BirdSelect';

import TrainingGameMaster from 'game/minigames/training/TrainingGameMaster';

export default class TrainingStartView extends Component {
  constructor() {
    super();
    this.state = {
      selectedBird: null
    };
  }

  onLeaveClick = () => {
    this.props.app.setView('world');
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        Training
        <BirdSelect birds={this.props.app.gm.ownedBirds} onSelect={b => this.setState({selectedBird: b})} />
        <Button onClick={this.onLeaveClick}>Back</Button>
      </div>
    )
  }
}
