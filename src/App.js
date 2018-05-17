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
import StablesView from './views/StablesView';
import TrainingStartView from './views/TrainingStartView';
import TrainingView from './views/TrainingView';
import TrainingFinishView from './views/TrainingFinishView';
import StoreView from './views/StoreView';
import InventoryView from './views/InventoryView';

import GameMaster from './GameMaster';

class App extends Component {
  constructor() {
    super();

    this.gm = new GameMaster();

    this.state = {
      view: 'world',
      viewProps: {
        race: this.gm.raceEvents['openTrackDay'].races['firstRace'],
        playerBird: this.gm.ownedBirds[0]
      }
    };

    this.views = {
      'raceTrack': RaceTrackView,
      'raceFinish': RaceFinishView,
      'raceSelection': RaceSelectionView,
      'world': WorldView,
      'stables': StablesView,
      'trainingStart': TrainingStartView,
      'training': TrainingView,
      'trainingFinish': TrainingFinishView,
      'store': StoreView,
      'inventory': InventoryView
    }
  }

  setView(viewName, viewProps) {
    this.setState({
      view: viewName,
      viewProps: viewProps
    })
  }

  renderView() {
    let View = this.views[this.state.view];
    if (View)
      return <View app={this} {...this.state.viewProps}/>
    else
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
