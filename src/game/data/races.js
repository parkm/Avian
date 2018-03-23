import Bird from '../Bird';
import BirdStats from '../BirdStats';
import Race from '../Race';
import RaceEvent from '../RaceEvent';

export default function genRaceEventsData() {
let events = {};

let openTrackDayRacers = [{
    name: 'Aimee',
    stats: new BirdStats({
      topMph: 15,
      accel: 5.25,
      stamina: 5,
      vigor: 10
    })
  }, {
    name: 'Knight',
    stats: new BirdStats({
      topMph: 18,
      accel: 4.80,
      stamina: 6,
      vigor: 10
    })
  }, {
    name: 'Robin',
    stats: new BirdStats({
      topMph: 20,
      accel: 2,
      stamina: 10,
      vigor: 10
    })
  }, {
    name: 'Edward',
    stats: new BirdStats({
      topMph: 17,
      accel: 5,
      stamina: 5,
      vigor: 10
    })
  }, {
    name: 'Cid',
    stats: new BirdStats({
      topMph: 16,
      accel: 8,
      stamina: 2,
      vigor: 20
    })
  }
];
events['openTrackDay'] = new RaceEvent({
  name: 'Open Track Day',
  restrictions: {},
  races: {
    'firstRace': new Race('First Race', openTrackDayRacers, 0.1, {
      '1': {
        money: 100
      },
      '2': {
        money: 25
      },
      '3': {
        money: 10
      }
    }),
    'somethingHarder': new Race('Something Harder', openTrackDayRacers, 0.2, {
      '1': {
        money: 150
      },
      '2': {
        money: 30
      },
      '3': {
        money: 10
      }
    }),
  },
  unlocks: ['rookieWeek'],
  rewards: {
    money: 5000
  }
});

let rookieWeekRacers = [{
    name: 'Ari',
    stats: new BirdStats({
      topMph: 35,
      accel: 5.25,
      stamina: 5,
      vigor: 10
    })
  }, {
    name: 'Knight',
    stats: new BirdStats({
      topMph: 36,
      accel: 4.80,
      stamina: 6,
      vigor: 10
    })
  }, {
    name: 'Robin',
    stats: new BirdStats({
      topMph: 40,
      accel: 2,
      stamina: 10,
      vigor: 10
    })
  }, {
    name: 'Fox',
    stats: new BirdStats({
      topMph: 34,
      accel: 5,
      stamina: 5,
      vigor: 10
    })
  }, {
    name: 'Sara',
    stats: new BirdStats({
      topMph: 30,
      accel: 8,
      stamina: 2,
      vigor: 20
    })
  }
];
events['rookieWeek'] = new RaceEvent({
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
  },
  unlocks: ['rookieWeek'],
  rewards: {
    money: 10000
  }
});

return events;
}
