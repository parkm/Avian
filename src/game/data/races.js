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
  rewards: {
    fans: 5,
    items: {
      'waterStone': 1
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
