// https://www.powerlanguage.co.uk/wordle/
export function makeHistogram(words) {
  // // each word can contribute multiple counts for a letter e.g. 'smell' is 2 for 'l
  const characterToWordFrequency = {};
  let totalCharacters = words[0].length * words.length;
  for (let i = 97; i < 123; i++) {
    characterToWordFrequency[String.fromCharCode(i)] = 0;
  }
  words.forEach((word) => {
    for (let i = 0; i < 5; i++) {
      characterToWordFrequency[word[i]]++;
    }
  });
  const entries = Object.entries(characterToWordFrequency);
  entries.sort((a, b) => {
    if (a[1] < b[1]) {
      return 1;
    }
    if (a[1] > b[1]) {
      return -1;
    }
    return 0;
  });

  const histogram = entries.map(([character, totalCharacterCount]) => [
    character,
    totalCharacterCount / totalCharacters,
  ]);

  return histogram;
}

export function getNewAlphabetSet() {
  const alphaset = new Set();
  for (let i = 97; i < 123; i++) {
    alphaset.add(String.fromCharCode(i));
  }
  return alphaset;
}
