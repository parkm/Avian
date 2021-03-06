import Bird from '../Bird';
import BirdStats from '../BirdStats';
import Race from '../Race';
import RaceEvent from '../RaceEvent';

export default function genRaceEventsData(breeds) {
let events = {};

let newRaceEvent = (eventId, data) => {
  events[eventId] = new RaceEvent(eventId, data);
};

let openTrackDayRacers = [{
    name: 'Aimee',
    stats: new BirdStats({
      topMph: 15,
      accel: 5.25,
      stamina: 5,
      vigor: 10
    }),
    breed: breeds['yellow']
  }, {
    name: 'Knight',
    stats: new BirdStats({
      topMph: 18,
      accel: 4.80,
      stamina: 6,
      vigor: 10
    }),
    breed: breeds['yellow']
  }, {
    name: 'Robin',
    stats: new BirdStats({
      topMph: 20,
      accel: 2,
      stamina: 10,
      vigor: 10
    }),
    breed: breeds['yellow']
  }, {
    name: 'Edward',
    stats: new BirdStats({
      topMph: 17,
      accel: 5,
      stamina: 5,
      vigor: 10
    }),
    breed: breeds['yellow']
  }, {
    name: 'Cid',
    stats: new BirdStats({
      topMph: 16,
      accel: 8,
      stamina: 2,
      vigor: 20
    }),
    breed: breeds['yellow']
  }
];
newRaceEvent('openTrackDay', {
  name: 'Open Track Day',
  restrictions: {},
  races: {
    'firstRace': new Race('First Race', openTrackDayRacers, 0.1, {
      '1': {
        money: 100,
        items: {
          'gysahlGreens': 5
        }
      },
      '2': {
        money: 25
      },
      '3': {
        money: 10
      }
    }, [
      [0.25, 0.28, 'water'],
      [0.75, 0.80, 'water']
    ]),
    'gettingBetter': new Race('Getting Better', openTrackDayRacers, 0.2, {
      '1': {
        money: 150,
        fans: 1
      },
      '2': {
        money: 30
      },
      '3': {
        money: 10
      }
    }),
    'racerOfTheDay': new Race('Racer of the Day', openTrackDayRacers, 0.3, {
      '1': {
        money: 200
      },
      '2': {
        money: 35
      },
      '3': {
        money: 15
      }
    }),
  },
  unlocks: ['rookieWeek'],
  rewards: {
    fans: 3,
    items: {
      'goodFormula': 1
    }
  }
});

let rookieWeekRacers = [{
    name: 'Ari',
    stats: new BirdStats({
      topMph: 35,
      accel: 5.25,
      stamina: 5,
      vigor: 10
    }),
    breed: breeds['yellow']
  }, {
    name: 'Knight',
    stats: new BirdStats({
      topMph: 36,
      accel: 4.80,
      stamina: 6,
      vigor: 10
    }),
    breed: breeds['yellow']
  }, {
    name: 'Robin',
    stats: new BirdStats({
      topMph: 40,
      accel: 2,
      stamina: 10,
      vigor: 10
    }),
    breed: breeds['yellow']
  }, {
    name: 'Fox',
    stats: new BirdStats({
      topMph: 34,
      accel: 5,
      stamina: 5,
      vigor: 10
    }),
    breed: breeds['yellow']
  }, {
    name: 'Sara',
    stats: new BirdStats({
      topMph: 30,
      accel: 8,
      stamina: 2,
      vigor: 20
    }),
    breed: breeds['yellow']
  }
];
newRaceEvent('rookieWeek', {
  name: 'Rookie Week',
  restrictions: {},
  races: {
    '0': new Race('First Race', rookieWeekRacers, 0.25, {
      '1': {
        money: 200
      },
      '2': {
        money: 50
      },
      '3': {
        money: 20
      }
    }),
    '1': new Race('Second Race', rookieWeekRacers, 0.25, {
      '1': {
        money: 250
      },
      '2': {
        money: 60
      },
      '3': {
        money: 25
      }
    }),
  },
  unlocks: ['wetlands'],
  rewards: {
    fans: 5,
    items: {
      'waterStone': 1
    }
  }
});

let wetlandRacers = [{
    name: 'Clues',
    stats: new BirdStats({
      topMph: 35,
      accel: 5.25,
      stamina: 5,
      vigor: 10
    }),
    breed: breeds['blue']
  }, {
    name: 'Knight',
    stats: new BirdStats({
      topMph: 37,
      accel: 4.90,
      stamina: 6,
      vigor: 10
    }),
    breed: breeds['yellow']
  }, {
    name: 'Robin',
    stats: new BirdStats({
      topMph: 41,
      accel: 3,
      stamina: 10,
      vigor: 10
    }),
    breed: breeds['yellow']
  }, {
    name: 'Geosgaeno',
    stats: new BirdStats({
      topMph: 36,
      accel: 5,
      stamina: 4,
      vigor: 10
    }),
    breed: breeds['blue']
  }, {
    name: 'Leviathan',
    stats: new BirdStats({
      topMph: 42,
      accel: 8,
      stamina: 2,
      vigor: 80
    }),
    breed: breeds['blue']
  }
];
newRaceEvent('wetlands', {
  name: 'Wetlands',
  restrictions: {},
  races: {
    '0': new Race('First Race', wetlandRacers, 0.25, {
      '1': {
        money: 250
      },
      '2': {
        money: 50
      },
      '3': {
        money: 20
      }
    }, [
      [0.25, 0.28, 'water'],
      [0.75, 0.80, 'water']
    ]),
    '1': new Race('Second Race', wetlandRacers, 0.25, {
      '1': {
        money: 300
      },
      '2': {
        money: 60
      },
      '3': {
        money: 25
      }
    }, [
      [0.28, 0.75, 'water'],
    ]),
  },
  unlocks: ['forest'],
  rewards: {
    fans: 5,
    itemUnlocks: ['topGear'],
    items: {
      'topGear': 1
    }
  }
});

let forestRacers = [{
    name: 'Yuffie',
    stats: new BirdStats({
      topMph: 35,
      accel: 5.25,
      stamina: 5,
      vigor: 10
    }),
    breed: breeds['green']
  }, {
    name: 'Knight',
    stats: new BirdStats({
      topMph: 37,
      accel: 4.90,
      stamina: 6,
      vigor: 10
    }),
    breed: breeds['yellow']
  }, {
    name: 'Robin',
    stats: new BirdStats({
      topMph: 41,
      accel: 3,
      stamina: 10,
      vigor: 10
    }),
    breed: breeds['yellow']
  }, {
    name: 'Emerald',
    stats: new BirdStats({
      topMph: 36,
      accel: 5,
      stamina: 4,
      vigor: 10
    }),
    breed: breeds['green']
  }, {
    name: 'Malboro',
    stats: new BirdStats({
      topMph: 42,
      accel: 8,
      stamina: 2,
      vigor: 80
    }),
    breed: breeds['green']
  }
];
newRaceEvent('forest', {
  name: 'Forest',
  restrictions: {},
  races: {
    '0': new Race('First Race', forestRacers, 0.25, {
      '1': {
        money: 350
      },
      '2': {
        money: 50
      },
      '3': {
        money: 20
      }
    }, [
      [0.25, 0.28, 'forest'],
      [0.75, 0.80, 'forest']
    ]),
    '1': new Race('Second Race', forestRacers, 0.25, {
      '1': {
        money: 400
      },
      '2': {
        money: 60
      },
      '3': {
        money: 25
      }
    }, [
      [0.28, 0.75, 'forest'],
    ]),
  },
  unlocks: ['mountain', 'bonus1'],
  rewards: {
    fans: 5,
    itemUnlocks: ['fireStone'],
    items: {
      'fireStone': 1
    }
  }
});

let bonusRacers = [{
    name: 'Squall',
    stats: new BirdStats({
      topMph: 70,
      accel: 10.25,
      stamina: 10,
      vigor: 20
    }),
    breed: breeds['black']
  }, {
    name: 'Cloud',
    stats: new BirdStats({
      topMph: 72,
      accel: 8.90,
      stamina: 12,
      vigor: 20
    }),
    breed: breeds['yellow']
  }, {
    name: 'Lightning',
    stats: new BirdStats({
      topMph: 75,
      accel: 12,
      stamina: 10,
      vigor: 20
    }),
    breed: breeds['pink']
  }, {
    name: 'Cecil',
    stats: new BirdStats({
      topMph: 60,
      accel: 7,
      stamina: 60,
      vigor: 60
    }),
    breed: breeds['blue']
  }, {
    name: 'Terra',
    stats: new BirdStats({
      topMph: 73,
      accel: 10,
      stamina: 11,
      vigor: 20
    }),
    breed: breeds['green']
  }
];
newRaceEvent('bonus1', {
  name: 'Bonus 1',
  restrictions: {
    fans: 100
  },
  races: {
    '0': new Race('First Race', bonusRacers, 1.25, {
      '1': {
        money: 2000
      },
      '2': {
        money: 500
      },
      '3': {
        money: 200
      }
    }),
    '1': new Race('Second Race', bonusRacers, 1.50, {
      '1': {
        money: 2200
      },
      '2': {
        money: 500
      },
      '3': {
        money: 200
      }
    }),
  },
  unlocks: ['bonus2'],
  rewards: {
    fans: 50,
    itemUnlocks: ['sylkisGreens'],
    items: {
      'sylkisGreens': 10
    }
  }
});

let bonus2Racers = [{
    name: 'Teioh',
    stats: new BirdStats({
      topMph: 80,
      accel: 10.25,
      stamina: 20,
      vigor: 15
    }),
    breed: breeds['black']
  }
];
newRaceEvent('bonus2', {
  name: 'Bonus 2',
  restrictions: {
    fans: 150
  },
  races: {
    '0': new Race('First Race', bonus2Racers, 1.25, {
      '1': {
        money: 3000
      },
      '2': {
        money: 0
      },
      '3': {
        money: 0
      }
    })
  },
  rewards: {
    fans: 100,
    itemUnlocks: ['carobNut'],
    items: {
      'carobNut': 1
    }
  }
});


let mountainRacers = [{
    name: 'Rubicante',
    stats: new BirdStats({
      topMph: 35,
      accel: 5.25,
      stamina: 5,
      vigor: 10
    }),
    breed: breeds['red']
  }, {
    name: 'Knight',
    stats: new BirdStats({
      topMph: 37,
      accel: 4.90,
      stamina: 6,
      vigor: 10
    }),
    breed: breeds['yellow']
  }, {
    name: 'Robin',
    stats: new BirdStats({
      topMph: 41,
      accel: 3,
      stamina: 10,
      vigor: 10
    }),
    breed: breeds['yellow']
  }, {
    name: 'Ruby',
    stats: new BirdStats({
      topMph: 36,
      accel: 5,
      stamina: 4,
      vigor: 10
    }),
    breed: breeds['red']
  }, {
    name: 'Ifrit',
    stats: new BirdStats({
      topMph: 42,
      accel: 8,
      stamina: 2,
      vigor: 80
    }),
    breed: breeds['red']
  }
];
newRaceEvent('mountain', {
  name: 'Mountains',
  restrictions: {},
  races: {
    '0': new Race('First Race', mountainRacers, 0.25, {
      '1': {
        money: 450
      },
      '2': {
        money: 50
      },
      '3': {
        money: 20
      }
    }, [
      [0.25, 0.28, 'mountain'],
      [0.75, 0.80, 'mountain']
    ]),
    '1': new Race('Second Race', mountainRacers, 0.25, {
      '1': {
        money: 500
      },
      '2': {
        money: 60
      },
      '3': {
        money: 25
      }
    }, [
      [0.70, 0.75, 'mountain'],
    ]),
    '2': new Race('Third Race', mountainRacers, 0.5, {
      '1': {
        money: 550
      },
      '2': {
        money: 60
      },
      '3': {
        money: 25
      }
    }, [
      [0.28, 0.75, 'mountain'],
    ]),
  },
  unlocks: ['dune'],
  rewards: {
    fans: 5,
    items: {
      'fireStone': 1
    }
  }
});

let duneRacers = [{
    name: 'Cactuar',
    stats: new BirdStats({
      topMph: 35,
      accel: 5.25,
      stamina: 5,
      vigor: 10
    }),
    breed: breeds['green']
  }, {
    name: 'Lobivia',
    stats: new BirdStats({
      topMph: 37,
      accel: 4.90,
      stamina: 6,
      vigor: 10
    }),
    breed: breeds['green']
  }, {
    name: 'Toumeya',
    stats: new BirdStats({
      topMph: 41,
      accel: 3,
      stamina: 10,
      vigor: 10
    }),
    breed: breeds['green']
  }, {
    name: 'Ruby',
    stats: new BirdStats({
      topMph: 36,
      accel: 5,
      stamina: 4,
      vigor: 10
    }),
    breed: breeds['red']
  }, {
    name: 'Mainyu',
    stats: new BirdStats({
      topMph: 42,
      accel: 8,
      stamina: 2,
      vigor: 80
    }),
    breed: breeds['orange']
  }
];
newRaceEvent('dune', {
  name: 'Dunes',
  restrictions: {},
  races: {
    '0': new Race('First Race', duneRacers, 0.25, {
      '1': {
        money: 600
      },
      '2': {
        money: 50
      },
      '3': {
        money: 20
      }
    }, [
      [0, 1, 'dune'],
    ]),
    '1': new Race('Second Race', duneRacers, 0.25, {
      '1': {
        money: 650
      },
      '2': {
        money: 60
      },
      '3': {
        money: 25
      }
    }, [
      [0, 1, 'dune'],
    ])
  },
  rewards: {
    fans: 5,
    items: {
      'fireStone': 1
    }
  }
});

let eliteRacesRacers = [{
    name: 'Teioh',
    stats: new BirdStats({
      topMph: 250,
      accel: 25,
      stamina: 50,
      vigor: 20
    }),
    breed: breeds['yellow']
  }, {
    name: 'Hyperion',
    stats: new BirdStats({
      topMph: 250,
      accel: 26,
      stamina: 30,
      vigor: 20
    }),
    breed: breeds['yellow']
  }, {
    name: 'Omega',
    stats: new BirdStats({
      topMph: 400,
      accel: 120,
      stamina: 10,
      vigor: 2
    }),
    breed: breeds['yellow']
  }, {
    name: 'Ultima',
    stats: new BirdStats({
      topMph: 200,
      accel: 60,
      stamina: 5,
      vigor: 100
    }),
    breed: breeds['yellow']
  }, {
    name: 'Yiazmat',
    stats: new BirdStats({
      topMph: 300,
      accel: 28,
      stamina: 25,
      vigor: 30
    }),
    breed: breeds['yellow']
  }
];
newRaceEvent('eliteRaces', {
  name: 'Elite Races',
  restrictions: {},
  races: {
    '0': new Race('First Race', eliteRacesRacers, 5, {
      '1': {
        money: 20000
      },
      '2': {
        money: 5000
      },
      '3': {
        money: 2000
      }
    }),
  },
  unlocks: [],
  rewards: {
    money: 500000
  }
});

return events;
}
