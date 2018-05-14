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
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Modal from 'react-bootstrap/lib/Modal';
import FormControl from 'react-bootstrap/lib/FormControl';

import BirdStatsDisplay from 'views/components/BirdStatsDisplay';
import FeedDisplay from 'views/components/FeedDisplay';
import BirdSelect from 'views/components/BirdSelect';
import NewBabyModal from 'views/components/NewBabyModal';

import Bird from 'game/Bird';

import chocoImg from 'res/gfx/choco.png';

export default class StablesView extends Component {
  static debugProps() {
    return {
    }
  }

  constructor() {
    super();
    this.state = {
      selectedBird: null,
      selectedBreedBird: null,
      newBaby: null
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

  onBreedClick = () => {
    this.setState({
      newBaby: this.props.app.gm.onBirdBreed(this.state.selectedBird, this.state.selectedBreedBird)
    });
  }

  onBabyName = (name) => {
    this.props.app.gm.onBirdBreedComplete(this.state.newBaby, name);
    this.setState({newBaby: null});
  }

  renderBreedingTab() {
    let bird = this.state.selectedBird;
    if (!bird) return null;
    let breedBirds = this.birds.filter(b => b !== bird && bird.sex !== b.sex && !bird.isKin(b))
    let breedBird = this.state.selectedBreedBird;
    return (
      <div>
        <NewBabyModal show={this.state.newBaby !== null} sex={this.state.newBaby ? this.state.newBaby.sex : null} onComplete={this.onBabyName} />
        <Grid fluid={true}>
          <Col sm={10}>
            <Grid fluid={true}>
              <Col sm={6}>
                <h1>
                  {bird.name}
                </h1>
                {bird.genes} genes
                <BirdStatsDisplay stats={bird.getStats()} />
              </Col>
              <Col sm={6}>
                {breedBird ?
                  <div>
                    <h1>
                      {breedBird.name}
                    </h1>
                    {breedBird.genes} genes
                    <BirdStatsDisplay stats={breedBird.getStats()} />
                  </div>
                : <h1>Select a Bird -></h1>}
              </Col>
              {breedBird ?
                <div>
                  <div>
                    <h2>
                      Predicted Results
                    </h2>
                    {Bird.mergeGenes(bird.genes, breedBird.genes)} genes
                    <BirdStatsDisplay stats={bird.getStats().average(breedBird.getStats())} />
                  </div>
                  <Button bsStyle="primary" onClick={this.onBreedClick}>Breed</Button>
                </div>
                : null
              }
            </Grid>
          </Col>
          <Col sm={2}>
            <BirdSelect birds={breedBirds} onSelect={b => this.setState({selectedBreedBird: b})}/>
          </Col>
        </Grid>

      </div>
    );
  }

  render() {
    return (
      <div>
        <Grid fluid={true}>
          <Col sm={1}>
            <BirdSelect birds={this.birds} onSelect={b => this.setState({selectedBird: b, selectedBreedBird: null})}/>
            <Button onClick={this.onLeaveClick}>Leave</Button>
          </Col>
          <Col sm={11}>
            <Tabs id="stablesview-tabs" defaultActiveKey={1} >
              <Tab eventKey={1} title="General">
                <div>
                  {this.renderBirdDetails()}
                </div>
              </Tab>
              <Tab eventKey={2} title="Breeding">
                  {this.renderBreedingTab()}
              </Tab>
            </Tabs>
          </Col>
        </Grid>
      </div>
    )
  }
}
