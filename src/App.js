import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

import Button from 'react-bootstrap/lib/Button';

import chocoImg from './res/gfx/choco.png';
import finishImg from './res/gfx/finish.png';

import RaceTrackView from './views/RaceTrackView';
import RaceFinishView from './views/RaceFinishView';
import RaceSelectionView from './views/RaceSelectionView';
import WorldView from './views/WorldView';

class App extends Component {
  constructor() {
    super();

    this.state = {
      view: 'world',
      viewProps: RaceFinishView.debugProps()
    };
  }

  setView(viewName, viewProps) {
    this.setState({
      view: viewName,
      viewProps: viewProps
    })
  }

  renderView() {
    let v = this.state.view;
    if (v === 'raceTrack')
      return <RaceTrackView app={this} {...this.state.viewProps}/>
    else if (v === 'raceFinish')
      return <RaceFinishView app={this} {...this.state.viewProps}/>
    else if (v === 'raceSelection')
      return <RaceSelectionView app={this} {...this.state.viewProps}/>
    else if (v === 'world')
      return <WorldView app={this} {...this.state.viewProps}/>
    return (<div>View not found</div>);
  }

  render() {
    return (
      <div className="App">
        {this.renderView()}
      </div>
    );
  }
}

export default App;
