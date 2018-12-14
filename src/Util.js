export default class Util {
  // Converts number or string number into ordinal form e.g. 1st, 2nd, 3rd
  static toOrdinal(num) {
    if (isNaN(num)) num = parseInt(num, 10);
    if (num <= 0) return null;

    let lastDigit = num % 10;
    if (lastDigit === 1 && num !== 11) {
      return num + 'st'
    } else if (lastDigit === 2 && num !== 12) {
      return num + 'nd'
    } else if (lastDigit === 3 && num !== 13) {
      return num + 'rd'
    }

    return num + 'th';
  }

  // Converts a word to a plural form if count is greater than 1
  // If wordPlural is not defined then it assumes the plural form is just {word} + s
  static plural(count, word, wordPlural=null) {
    if (count > 1) {
      if (wordPlural) return wordPlural;
      return word + 's';
    } else {
      return word;
    }
  }

  // Capitalizes the first letter of a word.
  static capitalize(word) {
    return word.charAt(0).toUpperCase() + word.substr(1);
  }
}
