import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'

import Button from 'react-bootstrap/lib/Button';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';

export default class FeedDisplay extends Component {
  constructor() {
    super();
    this.state = {
      selectedFeedItem: null,
      selectedFeed: null,
      feedAmount: 1
    };
  }

  onFeedClick = (item) => {
    this.setState({
      selectedFeedItem: item,
      selectedFeed: this.props.feeds[item.id]
    });
  }

  onFeedAmountChange = (e) => {
    this.setState({feedAmount: e.target.value});
  }

  onApplyClick = (e) => {
    this.props.onApply(this.state.selectedFeedItem, this.state.selectedFeed, this.state.feedAmount);
    this.setState({
      selectedFeedItem: null,
      selectedFeed: null,
      feedAmount: 1
    });
  }

  onCancelClick = (e) => {
    this.setState({
      selectedFeedItem: null,
      selectedFeed: null,
      feedAmount: 1
    });
  }

  render() {
    let growth = this.props.growth;
    let growthMax = this.props.growthMax;
    if (this.state.selectedFeed) {
      growth = this.state.selectedFeed.getStatsEffect().scale(this.state.feedAmount).add(growth).limit(growthMax);
    }
    return (
      <Grid fluid={true}>
        <Col sm={6}>
          <h3>Latent Growth</h3>
          <ListGroup>
            <ListGroupItem bsStyle={'success'}>
              <h4>
                Top Speed
              </h4>
              <div>
                +{growth.topMph.toFixed(2)} / {growthMax.topMph.toFixed(2)} mph
              </div>
            </ListGroupItem>
            <ListGroupItem bsStyle={'success'}>
              <h4>
                Stamina
              </h4>
              <div>
                +{growth.stamina.toFixed(2)} / {growthMax.stamina.toFixed(2)} seconds
              </div>
            </ListGroupItem>
            <ListGroupItem bsStyle={'success'}>
              <h4>
                Vigor
              </h4>
              <div>
                +{growth.vigor.toFixed(2)} / {growthMax.vigor.toFixed(2)} Stamina per second
              </div>
            </ListGroupItem>
            <ListGroupItem bsStyle={'success'}>
              <h4>
                Acceleration
              </h4>
              <div>
                +{growth.accel.toFixed(2)} / {growthMax.accel.toFixed(2)} mph per second
              </div>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col sm={6}>
          <h3>Feed</h3>
          <Grid fluid={true}>
            <Col sm={6}>
              <ListGroup>
                {
                  this.props.feedItems.map(item => {
                    return <ListGroupItem key={item.id} onClick={_ => this.onFeedClick(item)}>{item.name} x{item.count}</ListGroupItem>;
                  })
                }
              </ListGroup>
            </Col>
            <Col sm={6}>
              {
                this.state.selectedFeedItem ? (
                  <div>
                    <h4>{this.state.selectedFeedItem.name}</h4>
                    <div>+{this.state.selectedFeed.effect.topMph.toFixed(2)} Top Speed</div>
                    <div>+{this.state.selectedFeed.effect.stamina.toFixed(2)} Stamina</div>
                    <div>+{this.state.selectedFeed.effect.vigor.toFixed(2)} Vigor</div>
                    <div>+{this.state.selectedFeed.effect.accel.toFixed(2)} Acceleration</div>
                    <FormControl type="number" max={this.state.selectedFeedItem.count} min={1} value={this.state.feedAmount} onChange={this.onFeedAmountChange} />
                    <Button bsStyle="success" onClick={this.onApplyClick}>Apply</Button>
                    <Button bsStyle="danger" onClick={this.onCancelClick}>Cancel</Button>
                  </div>
                ) : null
              }
            </Col>
          </Grid>
        </Col>
      </Grid>
    );
  }
}
