import { words } from "../words.mjs";
import { makeHistogram } from "../prep.mjs";

export default class Bot {
  async setup(game) {
    if (!this.insights) {
      this.insights = {
        words,
        histogram: makeHistogram(words),
      };
    }
    this.game = game;
  }

  play() {
    throw new Error("Child didn't implement this function.");
  }
}
