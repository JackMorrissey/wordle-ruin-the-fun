import { readFile } from "fs/promises";

export default class Bot {
  async setup(game) {
    if (!this.insights) {
      this.insights = JSON.parse(
        await readFile(new URL("../out/insights.json", import.meta.url))
      );
    }
    this.game = game;
  }

  play() {
    throw new Error("Child didn't implement this function.");
  }
}
