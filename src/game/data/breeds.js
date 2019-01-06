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
    green: {
      name: 'Green',
      recipe: {
        a: {
          breed: 'blue'
        },
        b: {
          breed: 'yellow'
        }
      },
      filter: "hue-rotate(92deg)"
    },
    red: {
      name: 'Red',
      recipe: {
        a: {
          breed: 'green'
        },
        b: {
          breed: 'yellow'
        },
        item: 'fireStone'
      },
      filter: "hue-rotate(318deg) saturate(216%) brightness(98%)"
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
      filter: "hue-rotate(332deg) saturate(238%) brightness(86%)"
    }
  }

  for (let id in breeds) {
    let b = breeds[id];
    breeds[id] = new Breed(id, b);
  }

  return breeds;
}
