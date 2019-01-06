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
import Table from 'react-bootstrap/lib/Table';
import FormControl from 'react-bootstrap/lib/FormControl';

import BirdStatsDisplay from 'views/components/BirdStatsDisplay';
import FeedDisplay from 'views/components/FeedDisplay';
import BirdSelect from 'views/components/BirdSelect';

import BirdStats from 'game/BirdStats';

export default class StoreView extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: null,
      buyAmount: 0
    };
  }

  onLeaveClick = () => {
    this.props.app.setView('world');
  }

  componentWillMount() {
    this.itemStock = this.props.app.gm.unlockedStoreItems.map(iname => this.props.app.gm.items[iname]);
  }

  onItemClick(item) {
    this.setState({
      currentItem: item,
      buyAmount: 0
    });
  }

  onBuyAmountChange = (e) => {
    this.setState({buyAmount: e.target.value});
  }

  canBuy() {
    let cost = this.state.buyAmount * this.state.currentItem.value;
    return this.props.app.gm.money >= cost && this.state.buyAmount > 0;
  }

  onPurchaseClick = () => {
    let gm = this.props.app.gm;
    if (this.canBuy()) {
      gm.money -= this.state.buyAmount * this.state.currentItem.value;
      gm.inventory.addItem(this.state.currentItem, parseInt(this.state.buyAmount, 10));
      this.setState({buyAmount: 0});
    }
  }

  renderCurrentItemDiv(item) {
    if (!item) return null;
    let itemStock = this.props.app.gm.inventory.getItemCount(item);
    return (
      <div>
        <h4>
          {item.name}
        </h4>
        <div>
          Stock: {itemStock}
        </div>
        <div>
          <Grid>
            <Col sm={3} style={{'textAlign': 'right'}}>Quantity</Col>
            <Col sm={1}>
              <FormControl type="number" max={99-itemStock} min={0} value={this.state.buyAmount} onChange={this.onBuyAmountChange} />
            </Col>
          </Grid>
          <div>
            Cost: {item.value * this.state.buyAmount}
          </div>
          <Button disabled={!this.canBuy()} bsStyle="success" onClick={this.onPurchaseClick}>Purchase</Button>
        </div>
      </div>
    );
  }

  renderFeedItemStats(item) {
    if (!item || item.type !== 'feed') return null;
    let stats = new BirdStats(this.props.app.gm.feeds[item.id].effect);
    return (
      <div>
        <div>
          Feeds are used to increase latent growth on a bird.
        </div>
        <BirdStatsDisplay stats={stats} />
      </div>
    )
  }

  render() {
    let currentItem = this.state.currentItem;
    return (
      <div>
        <h1>
          Store
        </h1>
        <Grid>
          <Col sm={6}>
            <Table hover>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {this.itemStock.map(item => {
                  return (
                    <tr key={item.name} onClick={e => this.onItemClick(item)}>
                      <td>
                        <img src={item.icon} width="32px"></img>
                        {item.name}
                      </td>
                      <td>{item.value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
          <Col sm={6}>
            <Row>
              Money: {this.props.app.gm.money}
            </Row>
            <Row>
              {this.renderCurrentItemDiv(currentItem)}
            </Row>
          </Col>
        </Grid>
        <div>
          <div>{currentItem ? currentItem.description || null : null}</div>
          {this.renderFeedItemStats(currentItem)}
        </div>
        <Button onClick={this.onLeaveClick}>Back</Button>
      </div>
    )
  }
}
