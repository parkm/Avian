import Breed from 'game/Breed';

export default function genBreedsData() {
  let breeds = {
    yellow: {
      name: 'Yellow',
      filter: ''
    },
    red: {
      name: 'Red',
      recipe: {
        item: 'fireStone'
      },
      filter: ""
    },
    blue: {
      name: 'Blue',
      recipe: {
        item: 'waterStone'
      },
      filter: "hue-rotate(167deg)"
    },
    orange: {
      name: 'Orange',
      recipe: {
        a: {
          breed: 'red'
        },
        b: {
          breed: 'yellow'
        }
      },
      filter: ""
    }
  }

  for (let id in breeds) {
    let b = breeds[id];
    breeds[id] = new Breed(id, b);
  }

  return breeds;
}
