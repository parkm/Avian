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

import BirdStats from 'game/BirdStats';

import TrainingGameMaster from 'game/minigames/training/TrainingGameMaster';

export default class TrainingFinishView extends Component {
  constructor() {
    super();
    this.state = {
      stats: null
    }
  }

  onContinueClick = () => {
    this.props.app.setView('world');
  }

  componentDidMount() {
    let statPerc = this.props.trainingResults;
    let bird = this.props.bird;
    let growth = bird.latentGrowth;
    let stats = new BirdStats({
      topMph: growth.topMph * Math.min(1, statPerc.speed),
      accel: growth.accel * Math.min(1, statPerc.accel),
      stamina: growth.stamina * Math.min(1, statPerc.stamina),
      vigor: growth.vigor * Math.min(1, statPerc.vigor)
    });
    this.setState({stats: stats});
    this.props.app.gm.onTrainingComplete(bird, stats);
  }

  render() {
    return (
      <div>
        <h1>
          Training Completed
        </h1>
        <div>
          {this.props.bird.name} gained the following stats!
          {this.state.stats ? <BirdStatsDisplay stats={this.state.stats} /> : null}
        </div>
        <Button onClick={this.onContinueClick}>Continue</Button>
      </div>
    )
  }
}
