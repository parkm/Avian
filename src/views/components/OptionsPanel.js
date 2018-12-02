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
import Glyphicon  from 'react-bootstrap/lib/Glyphicon';

class SaveSlots extends Component {
  onSaveClick(save, index) {
    this.props.onSaveClick(save, index);
  }

  renderSaveSlotText(save) {
    if (save === null) return 'Empty';
    if (save.note.length <= 0) return save.date;
    return `${save.date} - ${save.note}`;
  }

  render() {
    return (
      <div>
        <ListGroup>
          {
            this.props.saves.map((save, i) => {
              return (
                <ListGroupItem onClick={_ => this.onSaveClick(save, i)}>
                  {this.renderSaveSlotText(save)}
                </ListGroupItem>
              )
            })
          }
        </ListGroup>
      </div>
    );
  }
}

export default class OptionsPanel extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      selectedOptionKey: null,
      modalState: 'options'
    };
  }

  renderOptionsState = () => {
    return (
      <React.Fragment>
        <Modal.Header>
          <Modal.Title>Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroupItem onClick={_ => this.setState({modalState: 'save'})}>
              Save Game
            </ListGroupItem>
            <ListGroupItem onClick={_ => this.setState({modalState: 'load'})}>
              Load Game
            </ListGroupItem>
            <ListGroupItem onClick={_ => this.setState({modalState: 'backup'})}>
              Backup Save
            </ListGroupItem>
            <ListGroupItem onClick={_ => this.setState({modalState: 'restore_backup'})}>
              Restore Backup
            </ListGroupItem>
          </ListGroup>
        </Modal.Body>
      </React.Fragment>
    );
  }

  onSaveClick = (save, index) => {
    if (save && !window.confirm(`Are you sure you wish to override the data on slot ${index+1}?`)) return;
    let note = window.prompt('Note for this save') || '';
    this.props.onSaveClick(save, index, note);
  }

  onLoadSaveClick = (save, index) => {
    if (!save) return;
    if (!window.confirm(`Are you sure you wish to load the data on slot ${index+1}? All unsaved progress will be lost.`)) return;
    this.props.onLoadSaveClick(save, index);
  }

  renderSaveState = () => {
    return (
      <React.Fragment>
        <Modal.Header>
          <Modal.Title>Save Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SaveSlots
            saves={this.props.gameSaves}
            onSaveClick={this.onSaveClick}
          />
        </Modal.Body>
      </React.Fragment>
    )
  }

  renderLoadState = () => {
    return (
      <React.Fragment>
        <Modal.Header>
          <Modal.Title>Load Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SaveSlots
            saves={this.props.gameSaves}
            onSaveClick={this.onLoadSaveClick}
          />
        </Modal.Body>
      </React.Fragment>
    )
  }

  renderModalState() {
    switch(this.state.modalState) {
      case 'options':
        return this.renderOptionsState();
      case 'save':
        return this.renderSaveState();
      case 'load':
        return this.renderLoadState();
      case 'backup':
        return 'Not yet implemented.';
      case 'restore_backup':
        return 'Not yet implemented.';
    }
  }

  render() {
    return (
      <div>
        <div className="options-panel">
          <Button
            onClick={_ => this.setState({showModal: true})}
          >
            <Glyphicon glyph="glyphicon glyphicon-menu-hamburger" />
          </Button>
        </div>
        <Modal show={this.state.showModal} onExited={_ => this.setState({modalState: 'options'})}>
          {
            this.state.modalState === 'options' ? null : (
              <Button
                onClick={_ => this.setState({modalState: 'options'})}
              >
                <Glyphicon glyph="glyphicon glyphicon-menu-left" />
              </Button>
            )
          }
          {this.renderModalState()}
          <Modal.Footer>
            <Button
              onClick={_ => this.setState({showModal: false})}
              bsStyle="primary"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
