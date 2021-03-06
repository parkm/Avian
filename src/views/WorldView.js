import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'

import Button from 'react-bootstrap/lib/Button';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import chocoImg from 'res/gfx/choco.png';

export default class WorldView extends Component {
  onRacesClick = () => {
    this.props.app.setView('raceSelection');
  }

  onStablesClick = () => {
    this.props.app.setView('stables');
  }

  onTrainingClick = () => {
    this.props.app.setView('trainingStart');
  }

  onStoreClick = () => {
    this.props.app.setView('store');
  }

  onInventoryClick = () => {
    this.props.app.setView('inventory');
  }

  onExploreClick = () => {
    this.props.app.setView('explore');
  }

  onFarmClick = () => {
    this.props.app.setView('farm');
  }

  render() {
    return (
      <div>
        <div>
          Current Money: {this.props.app.gm.money}
        </div>
        <div>
          Total Fans: {this.props.app.gm.fans}
        </div>
        <Button bsStyle='info' onClick={this.onRacesClick}>
          Races <img src={chocoImg} />
        </Button>
        <Button bsStyle='primary' onClick={this.onStablesClick}>
          Stables <img src={chocoImg} />
        </Button>
        <Button bsStyle='success' onClick={this.onTrainingClick}>
          Training <img src={chocoImg} />
        </Button>
        <Button bsStyle='success' onClick={this.onStoreClick}>
          Store $
        </Button>
        <Button onClick={this.onInventoryClick}>
          Inventory
        </Button>
        <div>
          <Button bsStyle='success' onClick={this.onExploreClick}>
            Explore
          </Button>
          <Button bsStyle='success' onClick={this.onFarmClick}>
            Farm
          </Button>
        </div>
      </div>
    )
  }
}
