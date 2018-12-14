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
import Table from 'react-bootstrap/lib/Table';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import BirdStatsDisplay from 'views/components/BirdStatsDisplay';
import FeedDisplay from 'views/components/FeedDisplay';
import BirdSelect from 'views/components/BirdSelect';
import NewBabyModal from 'views/components/NewBabyModal';

import Bird from 'game/Bird';
import BirdStats from 'game/BirdStats';

import chocoImg from 'res/gfx/choco.png';

import Util from '../Util';

class PurchaseButton extends Component {
  onPurchaseClick = () => {
    let bird = new Bird('', this.state.sex, 'average', this.props.stats);
    this.props.onBuy(bird, this.props.price);
  }

  state = {
    sex: 'male'
  }

  render() {
    return (
      <Panel>
        <Panel.Body>
          <div>
            <img src={chocoImg} />
          </div>
          <div>
            {this.props.name}
          </div>

          <div>
          ${this.props.price}
          </div>
          <div>
            <DropdownButton
              id="bird-sex-dropdown"
              title={Util.capitalize(this.state.sex)}
              onSelect={x => this.setState({sex: x})}
            >
              <MenuItem eventKey="male">Male</MenuItem>
              <MenuItem eventKey="female">Female</MenuItem>
            </DropdownButton>
          </div>
          <BirdStatsDisplay stats={this.props.stats} />
          <Button
            bsStyle="primary"
            disabled={this.props.money < this.props.price}
            onClick={this.onPurchaseClick}
          >
            Purchase
          </Button>
        </Panel.Body>
      </Panel>
    );
  }
}

export default class FarmView extends Component {
  static debugProps() {
    return {
    }
  }

  constructor() {
    super();
    this.state = {
      selectedBird: null,
      newBird: null,
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

  onBirdName = (name) => {
    let bird = this.state.newBird;
    bird.name = name;
    bird.breed = this.props.app.gm.breeds['yellow'];
    this.props.app.gm.ownedBirds.push(bird);
    this.setState({newBird: null});
  }

  onBuy = (bird, price) => {
    this.props.app.gm.money -= price;
    this.setState({newBird: bird});
  }

  renderBuy() {
    let money = this.props.app.gm.money;
    return (
      <div>
        <NewBabyModal show={this.state.newBird !== null} sex={this.state.newBird ? this.state.newBird.sex : null} onComplete={this.onBirdName} />
        <Grid fluid={true}>
          <Col sm={3}>
            <PurchaseButton
              name="Basic"
              money={money}
              price={200}
              onBuy={this.onBuy}
              stats={new BirdStats({
                topMph: 30,
                accel: 5,
                stamina: 5,
                vigor: 10
              })}
            />
          </Col>
          <Col sm={3}>
            <PurchaseButton
              name="Advanced"
              money={money}
              price={2000}
              onBuy={this.onBuy}
              stats={new BirdStats({
                topMph: 60,
                accel: 10,
                stamina: 10,
                vigor: 15
              })}
            />
          </Col>
          <Col sm={3}>
            <PurchaseButton
              name="Pro"
              money={money}
              price={5000}
              onBuy={this.onBuy}
              stats={new BirdStats({
                topMph: 100,
                accel: 12,
                stamina: 12,
                vigor: 25
              })}
            />
          </Col>
          <Col sm={3}>
            <PurchaseButton
              name="Elite"
              money={money}
              price={50000}
              onBuy={this.onBuy}
              stats={new BirdStats({
                topMph: 200,
                accel: 15,
                stamina: 15,
                vigor: 30
              })}
            />
          </Col>
        </Grid>
      </div>
    );
  }

  onSellClick = () => {
    if (window.confirm(`Are you sure you wish to sell ${this.state.selectedBird.name}?`) === false) return;
    let bindex = this.birds.indexOf(this.state.selectedBird);
    this.props.app.gm.ownedBirds.splice(bindex, 1);
    this.props.app.gm.money += this.state.selectedBird.getWorth();
    this.setState({selectedBird: null});
  }

  renderSell() {
    let bird = this.state.selectedBird;
    return (
      <div>
        <Grid fluid={true}>
          <Col sm={3}>
            <BirdSelect birds={this.birds} onSelect={b => this.setState({selectedBird: b})}/>
          </Col>
          <Col sm={9}>
            {bird ? (
              <Panel>
                <h1>{bird.name}</h1>
                <h3>{Util.capitalize(bird.genes)} Genes</h3>
                <BirdStatsDisplay stats={bird.getStats()}/>
                <h4>Worth: {bird.getWorth()}</h4>
                <Button
                  bsStyle="primary"
                  disabled={this.props.app.gm.ownedBirds.length <= 1}
                  onClick={this.onSellClick}
                >
                  Sell
                </Button>
              </Panel>
            ) : null}
          </Col>
        </Grid>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div>
          Money: {this.props.app.gm.money}
        </div>
        <Tabs animation={false} id="farmview-tabs" defaultActiveKey={1} >
          <Tab eventKey={1} title="Buy">
            <div>
              {this.renderBuy()}
            </div>
          </Tab>
          <Tab eventKey={2} title="Sell">
              {this.renderSell()}
          </Tab>
        </Tabs>
        <Button onClick={_ => this.props.app.setView('world')}>Leave</Button>
      </div>
    )
  }
}
