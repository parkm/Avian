import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

import Button from 'react-bootstrap/lib/Button';

import chocoImg from './res/gfx/choco.png';
import finishImg from './res/gfx/finish.png';

class RaceTrackView extends Component {
  constructor() {
    super();

    this.state = {
      raceFinished: false
    };
  }

  componentWillMount() {
    this.racers = this.props.racers || this.getRacers();
  }

  // TODO
  getRacers() {
    return [{
        name: 'player'
      },  {
        name: 'another guy'
      }, {
        name: 'more'
      }, {
        name: 'people'
      }, {
        name: 'test'
      }, {
        name: 'choco'
      }
    ];
  }

  onRaceStart = () => {
    console.log('Race start!')
    this.setState({
      raceFinished: true
    });
  }

  onFinishContinue = () => {
    this.props.app.setView('raceFinish', {
      winners: {
        '1': {name: 'player'},
        '2': {name: 'choco'},
        '3': {name: 'test'}
      }
    });
  }

  // TODO
  getRacerPercentage(racer) {
    return Math.random() * 100;
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Race</h1>
        </header>
        <Button bsStyle="primary" onClick={this.onRaceStart}>Start</Button>
        {this.racers.map((racer, i) => {
          return (
            <div key={i} className="race-block">
              <img src={chocoImg} className="sprite choco-racer" style={{left: `${this.getRacerPercentage()}%`}}/>
              <div className="race-line" />
            </div>
          )
        })}
        {this.state.raceFinished ? (
          <div>
            <img src={finishImg} className="race-finish" />
            <Button bsStyle="primary" className="race-finish-button" onClick={this.onFinishContinue}>Continue</Button>
          </div>
          ) : null
        }

      </div>
    );
  }
}

class RaceFinishView extends Component {
  render() {
    return (
      <div>
        <h1>
        Winners
        </h1>
        <h2>
          1st place: {this.props.winners['1'].name}
        </h2>
        <h3>
          2nd place: {this.props.winners['2'].name}
        </h3>
        <h3>
          3rd place: {this.props.winners['3'].name}
        </h3>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      view: 'raceTrack',
      viewProps: {}
    };
  }

  componentWillMount() {
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
    return null;
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
