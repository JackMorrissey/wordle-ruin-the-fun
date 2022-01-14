import Bot from "./bot.mjs";
import { getNewAlphabetSet, makeHistogram } from "../prep.mjs";

export class Archibald extends Bot {
  constructor(game) {
    super(game);
  }

  play() {
    const initialHistogramObject = this.getHistogramObject(
      this.insights.histogram
    );
    let words = this.insights.words;
    let guess = this.getBestWord(words, initialHistogramObject, true);
    this.game.guess(guess);
    while (!this.game.over) {
      words = this.getNewWords(words, this.game.guesses, this.game.responses);
      if (!words.length) {
        console.log("Failed to find words");
        break;
      }
      guess = this.getBestWord(words, this.makeHistogramObject(words));
      this.game.guess(guess);
    }
    this.game.print();
  }

  makeHistogramObject(words) {
    return this.getHistogramObject(makeHistogram(words));
  }

  getHistogramObject(sortedHistogram) {
    return sortedHistogram.reduce((prev, [char, frequency]) => {
      prev[char] = frequency;
      return prev;
    }, {});
  }

  getNewWords(prevWords, guesses, responses) {
    const { possibilities, have, mustHave } = this.getPossibilities(
      guesses,
      responses
    );
    return prevWords.filter((word) => {
      const required = new Set(...mustHave);
      for (let i = 0; i < word.length; i++) {
        if (!possibilities[i].has(word[i])) {
          return false;
        }
        required.delete(word[i]);
      }
      return required.size === 0;
    });
  }

  getPossibilities(guesses, responses) {
    const possibilities = [];
    const wordLength = guesses[0].length;
    for (let i = 0; i < wordLength; i++) {
      possibilities.push(getNewAlphabetSet());
    }

    // double letters are gonna give Archy trouble. :shipit:
    const have = new Set();
    const mustHave = new Set();
    for (let i = 0; i < responses.length; i++) {
      const localMustHave = [];
      for (let j = 0; j < wordLength; j++) {
        const charGuess = guesses[i][j];
        const charResponse = responses[i][j];
        if (charResponse == "🟩") {
          const absoluteSet = new Set();
          absoluteSet.add(charGuess);
          possibilities[j] = absoluteSet;
          have.add(charGuess);
        } else if (charResponse == "🟨") {
          possibilities[j].delete(charGuess);
          mustHave.add(charGuess);
          localMustHave.push(charGuess);
        }
      }
      for (let j = 0; j < wordLength; j++) {
        const charGuess = guesses[i][j];
        const charResponse = responses[i][j];
        if (charResponse == "⬛" && !localMustHave.includes(charGuess)) {
          for (let k = 0; k < wordLength; k++) {
            if (possibilities[k].size !== 1) {
              possibilities[k].delete(charGuess);
            }
          }
        }
      }
    }
    return {
      possibilities,
      mustHave,
      have,
    };
  }

  getBestWord(words, histogramObject, favorUnique = true) {
    let bestWord = "";
    let bestFrequency = -1;
    words.forEach((word) => {
      let totalFrequency = 0;
      let charSet = new Set();
      for (let i = 0; i < word.length; i++) {
        charSet.add(word[i]);
        if (!favorUnique || !charSet.has(word[i])) {
          totalFrequency += histogramObject[word[i]];
        }
      }
      if (totalFrequency > bestFrequency) {
        bestWord = word;
        bestFrequency = totalFrequency;
      }
    });
    return bestWord;
  }
}
