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

import chocoImg from 'res/gfx/choco.png';

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
    this.feeds = this.props.app.gm.feeds;
    this.inventory = this.props.app.gm.inventory;
  }

  onBirdItemClick = (bird) => {
    this.setState({
      selectedBird: bird
    });
  }

  onLeaveClick = () => {
    this.props.app.setView('world');
  }

  onFeedApply = (feedItem, feed, amount) => {
    this.props.app.gm.onFeedApplyToBird(this.state.selectedBird, feedItem, feed, amount);
    this.setState({});
  }

  renderBirdDetails() {
    if (!this.state.selectedBird) return null;
    let bird = this.state.selectedBird;
    let growth = bird.getLatentGrowth();

    let currentStats = bird.getStats();
    let growthMax = bird.getLatentGrowthMax();

    return (
      <div>
        <h1>
          {bird.name}
        </h1>
        <div>
          <Grid>
            <Col sm={6}>
              {bird.sex}
            </Col>
            <Col sm={6}>
              {bird.genes} genes
            </Col>
          </Grid>
        </div>
        <Grid fluid={true}>
          <Col sm={4}>
            <h3>Birth</h3>
            <BirdStatsDisplay stats={bird.getBirthStats()} />
          </Col>
          <Col sm={4}>
            <h3>Current</h3>
            <BirdStatsDisplay bsStyle="warning" stats={bird.getStats()} />
          </Col>
          <Col sm={4}>
            <h3>Potential</h3>
            <BirdStatsDisplay bsStyle="danger" stats={bird.getMaxStats()} />
          </Col>
        </Grid>
        <FeedDisplay growth={growth} growthMax={growthMax} feeds={this.feeds} feedItems={this.inventory.getItemsByType('feed')} onApply={this.onFeedApply} />
      </div>
    );
  }

  render() {
    return (
      <div>
        <Grid fluid={true}>
          <Col sm={1}>
            <BirdSelect birds={this.birds} onSelect={b => this.setState({selectedBird: b})}/>
            <Button onClick={this.onLeaveClick}>Leave</Button>
          </Col>
          <Col sm={11}>
            <div>
              {this.renderBirdDetails()}
            </div>
          </Col>
        </Grid>
      </div>
    )
  }
}
