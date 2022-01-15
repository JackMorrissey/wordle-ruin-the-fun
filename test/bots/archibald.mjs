import tap from "tap";
import { Archibald } from "../../bots/archibald.mjs";
import { Game } from "../../play.mjs";

const newGame = new Game("taste");
const archibald = new Archibald();
archibald.setup(newGame).then(() => {
  archibald.play();
  newGame.print();

  tap.notOk(newGame.remainingGuesses);
});
