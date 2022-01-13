// https://www.powerlanguage.co.uk/wordle/
// https://www.npmjs.com/package/wordlist-english

import wordlist from "wordlist-english";
import fs from "fs";
import { exit } from "process";

function prepWords() {
  const frequencyCategories = [10, 20, 35, 40, 50, 55, 60, 70];
  const words = frequencyCategories
    .map(getWordsByFrequencyCategory)
    .reduce((prev, curr) => prev.concat(curr), []);

  const histogram = makeHistogram(words);
  const result = {
    histogram,
    words,
  };
  try {
    fs.mkdirSync("out");
  } catch {
    // it's coo
  }

  fs.writeFile("out/insights.json", JSON.stringify(result), "utf8", (err) => {
    if (err) {
      console.error("Unable to write file");
      exit(1);
    }
    console.log("Wrote insights.json with word count of " + words.length);
  });
}

function getWordsByFrequencyCategory(frequencyCategory) {
  return wordlist[`english/${frequencyCategory}`].filter(isEligibleWord);
}

function isEligibleWord(word) {
  return word.length === 5 && /^[a-z]+$/.test(word);
}

function makeHistogram(words) {
  // // each word can contribute multiple counts for a letter e.g. 'smell' is 2 for 'l
  const characterToWordFrequency = {};
  let totalCharacters = 5 * words.length;
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

prepWords();
