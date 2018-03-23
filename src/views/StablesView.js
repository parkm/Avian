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

import chocoImg from '../res/gfx/choco.png';

export default class StablesView extends Component {
  static debugProps() {
    return {
    }
  }

  constructor() {
    super();
    this.state = {
      selectedBird: null,
      activeNavKey: null
    };
  }

  componentWillMount() {
    this.birds = this.props.app.gm.ownedBirds;
  }

  onBirdItemClick = (bird) => {
    this.setState({
      selectedBird: bird
    });
  }

  onLeaveClick = () => {
    this.props.app.setView('world');
  }

  renderBirdDetails() {
    if (!this.state.selectedBird) return null;
    let topSpeed = this.state.selectedBird.stats.topMph;
    let accel = this.state.selectedBird.stats.accel;
    let bird = this.state.selectedBird;
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
        <ListGroup>
          <ListGroupItem>
            <h4>
              Top Speed
            </h4>
            <div>
              {topSpeed} mph
            </div>
          </ListGroupItem>
          <ListGroupItem>
            <h4>
              Stamina
            </h4>
            <div>
              {bird.stats.stamina} seconds
            </div>
          </ListGroupItem>
          <ListGroupItem>
            <h4>
              Vigor
            </h4>
            <div>
              {bird.stats.vigor}% Stamina per second
            </div>
          </ListGroupItem>
          <ListGroupItem>
            <h4>
              Acceleration
            </h4>
            <div>
              {accel} mph per second
            </div>
            <div>
              0 to {topSpeed} mph in {Number(topSpeed / accel).toFixed(2)} seconds
            </div>
            <div>
              0 to 60 mph in {Number(60 / accel).toFixed(2)} seconds
            </div>
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Grid fluid={true}>
          <Col sm={1}>
            <Nav bsStyle="pills" stacked activeKey={this.state.activeNavKey} onSelect={k => this.setState({activeNavKey: k})}>
              {
                this.birds.map((b, i) => {
                  return (
                    <NavItem eventKey={i} key={i} onClick={_ => this.onBirdItemClick(b)}>
                      <img src={chocoImg} />
                      <div>
                        {b.name}
                      </div>
                    </NavItem>
                  );
                })
              }
            </Nav>
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
