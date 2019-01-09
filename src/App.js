import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './bootstrap.css'
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
import ExploreView from './views/ExploreView';
import FarmView from './views/FarmView';
import DbgRaceInfoView from './views/DbgRaceInfoView';
import OptionsPanel from './views/components/OptionsPanel';

import GameMaster from './GameMaster';

class App extends Component {
  constructor() {
    super();

    this.gm = new GameMaster();
    if (process.env.NODE_ENV === 'development') {
      window.gm = this.gm;
    }

    this.state = {
      view: 'dbgRaceInfo',
      viewProps: {
        race: this.gm.raceEvents['openTrackDay'].races['firstRace'],
        playerBird: this.gm.ownedBirds[0]
      },
      gameSaves: this.getSaves()
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
      'inventory': InventoryView,
      'explore': ExploreView,
      'farm': FarmView,
      'dbgRaceInfo': DbgRaceInfoView
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

  getSaves = () => {
    if (localStorage.getItem('gameSaves')) {
      return JSON.parse(localStorage.getItem('gameSaves'))
    } else {
      return new Array(10).fill(null)
    }
  }

  onSaveClick = (save, index, note) => {
    let saves = this.state.gameSaves;
    saves[index] = this.gm.genSaveObjectFromGameData(note);
    localStorage.setItem('gameSaves', JSON.stringify(saves));
    this.setState({gameSaves: saves});
  }

  onLoadSaveClick = (save, index) => {
    this.gm.loadGameDataFromSaveObject(save);
    this.setView('world');
  }

  render() {
    return (
      <div className="App">
        <div>
          {this.renderView()}
        </div>
        <OptionsPanel
          gameSaves={this.state.gameSaves}
          onSaveClick={this.onSaveClick}
          onLoadSaveClick={this.onLoadSaveClick}
        />
      </div>
    );
  }
}

export default App;
