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

import chocoImg from 'res/gfx/choco.png';

export default class NewBabyModal extends Component {
  constructor() {
    super();
    this.state = {
      babyName: ''
    };
  }

  onAdd = () => {
    this.props.onComplete(this.state.babyName);
    this.setState({babyName: ''});
  }

  render() {
    return (
      <Modal show={this.props.show}>
        <Modal.Header>
          <Modal.Title><img src={chocoImg}/>{`  It's a ${this.props.sex === 'male' ? 'boy' : 'girl'}!`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          What shall we call you?
          <FormControl
            type="text"
            value={this.state.babyName}
            onChange={e => this.setState({babyName: e.target.value})}
            placeholder="Enter a name"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={this.state.babyName.length <= 0} bsStyle="primary" onClick={this.onAdd}>Add To Stable</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
