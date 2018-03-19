import Bird from '../Bird';
import BirdStats from '../BirdStats';
import Race from '../Race';
import RaceEvent from '../RaceEvent';

export default function genRaceEventsData() {
let events = {};

let openTrackDayRacers = [{
    name: 'another guy',
    stats: new BirdStats({
      topMph: 250,
      accel: 10,
      stamina: 30,
      vigor: 30
    })
  }, {
    name: 'more',
    stats: new BirdStats({
      topMph: 150,
      accel: 11,
      stamina: 30,
      vigor: 30
    })
  }, {
    name: 'people',
    stats: new BirdStats({
      topMph: 100,
      accel: 20,
      stamina: 30,
      vigor: 30
    })
  }, {
    name: 'test',
    stats: new BirdStats({
      topMph: 230,
      accel: 5,
      stamina: 30,
      vigor: 30
    })
  }, {
    name: 'choco',
    stats: new BirdStats({
      topMph: 280,
      accel: 30,
      stamina: 30,
      vigor: 30
    })
  }
];
events['openTrackDay'] = new RaceEvent({
  name: 'Open Track Day',
  restrictions: {},
  races: {
    'firstRace': new Race('First Race', openTrackDayRacers, 0.5, {
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
    'somethingHarder': new Race('Something Harder', openTrackDayRacers, 1.0, {
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

let rookieWeekRacers = Array.from(openTrackDayRacers);
rookieWeekRacers.push({name: 'super', stats: new BirdStats({
  topMph: 800,
  accel: 40,
  stamina: 30,
  vigor: 30
})});
events['rookieWeek'] = new RaceEvent({
  name: 'Rookie Week',
  restrictions: {},
  races: {
    '0': new Race('First Race', rookieWeekRacers, 1, {
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
