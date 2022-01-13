import Bot from "./bot.mjs";

export class Archibald extends Bot {
  constructor(game) {
    super(game);
  }

  play() {
    const initialHistogramObject = this.getInitialHistogramObject();
    const firstWord = this.getBestWord(
      this.insights.words,
      initialHistogramObject,
      true
    );
    const firstResponse = this.game.guess(firstWord);
    this.game.guess("drink");
    this.game.guess("drink");
    this.game.guess("drink");
    this.game.guess("drink");
    this.game.guess("drink");
  }

  getInitialHistogramObject() {
    return this.insights.histogram.reduce((prev, curr) => {
      prev[curr[0]] = curr[1];
      return prev;
    }, {});
  }

  getNewWords(prevWords, guess, response) {}

  getBestWord(words, histogramObject, unique = false) {
    let bestWord = "";
    let bestFrequency = -1;
    words.forEach((word) => {
      let totalFrequency = 0;
      let charSet = new Set();
      for (let i = 0; i < word.length; i++) {
        charSet.add(word[i]);
        if (!unique || !charSet.has(word[i])) {
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
