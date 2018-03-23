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

import BirdStatsDisplay from 'views/components/BirdStatsDisplay';

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
    let bird = this.state.selectedBird;
    let stats = bird.getStats();
    let topSpeed = stats.topMph;
    let accel = stats.accel;
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
        <BirdStatsDisplay stats={stats} />
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
