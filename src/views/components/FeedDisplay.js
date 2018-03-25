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
  render() {
    let growth = this.props.growth;
    let growthMax = this.props.growthMax;
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
                <ListGroupItem>Item 1</ListGroupItem>
                <ListGroupItem>Item 2</ListGroupItem>
                <ListGroupItem>Item 3</ListGroupItem>
                <ListGroupItem>Item 4</ListGroupItem>
                <ListGroupItem>Item 5</ListGroupItem>
              </ListGroup>
            </Col>
            <Col sm={6}>
              <h4>Gysahl Greens</h4>
              <div>+0.10 Top Speed</div>
              <div>+0.05 Stamina</div>
              <div>+0.10 Vigor</div>
              <div>+0.05 Acceleration</div>
              <FormControl type="number" max={99} min={1} defaultValue={1} />
              <Button bsStyle="success">Apply</Button>
            </Col>
          </Grid>
        </Col>
      </Grid>
    );
  }
}
