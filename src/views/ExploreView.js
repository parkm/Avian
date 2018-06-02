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

import ExploreGameMaster from 'game/minigames/explore/ExploreGameMaster';

export default class ExploreView extends Component {
  constructor() {
    super();
  }

  onLeaveClick = () => {
    this.props.app.setView('world');
  }

  componentDidMount() {
    this.gm = new ExploreGameMaster(this.canvas);
  }

  render() {
    return (
      <div>
        <canvas ref={r => this.canvas=r}></canvas>
        <Button onClick={this.onLeaveClick}>Leave</Button>
      </div>
    )
  }
}
