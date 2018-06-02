import Breed from 'game/Breed';

export default function genBreedsData() {
  let breeds = {
    yellow: {name: 'Yellow'},
    red: {
      name: 'Red',
      recipe: {
        item: 'fireStone'
      }
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
      }
    }
  }

  for (let id in breeds) {
    let b = breeds[id];
    breeds[id] = new Breed(id, b);
  }

  return breeds;
}
