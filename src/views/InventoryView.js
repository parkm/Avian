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

import BirdStatsDisplay from 'views/components/BirdStatsDisplay';
import FeedDisplay from 'views/components/FeedDisplay';
import BirdSelect from 'views/components/BirdSelect';

export default class InventoryView extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  onLeaveClick = () => {
    this.props.app.setView('world');
  }

  componentDidMount() {
  }

  render() {
    let items = Array.from(this.props.app.gm.inventory.itemsMap.values());
    return (
      <div style={{margin: '100px'}}>
        <h1>
          Inventory
        </h1>
        <Table hover>
          <thead>
            <tr>
              <th>Item</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => {
              return (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.count}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Button onClick={this.onLeaveClick}>Back</Button>
      </div>
    )
  }
}
