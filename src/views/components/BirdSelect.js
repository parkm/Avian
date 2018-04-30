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

import chocoImg from 'res/gfx/choco.png';

export default class BirdSelect extends Component {
  constructor() {
    super();
    this.state = {
      selectedBirdKey: null
    };
  }

  render() {
    return (
      <div>
        <Nav bsStyle="pills" stacked activeKey={this.state.selectedBirdKey} onSelect={k => this.setState({selectedBirdKey: k})}>
          {
            this.props.birds.map((b, i) => {
              return (
                <NavItem eventKey={i} key={i} onClick={_ => this.props.onSelect(b)}>
                  <img src={chocoImg} />
                  <div>
                    {b.name}
                  </div>
                </NavItem>
              );
            })
          }
        </Nav>
      </div>
    )
  }
}
