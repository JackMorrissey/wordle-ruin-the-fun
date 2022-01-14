import tap from "tap";
import { getResponse, Game } from "../play.mjs";

tap.equal(getResponse("snake", "drink"), "⬛🟨⬛🟨⬛");
tap.equal(getResponse("drank", "drink"), "🟩🟩⬛🟩🟩");
tap.equal(getResponse("drink", "drink"), "🟩🟩🟩🟩🟩");

tap.equal(getResponse("about", "abbey"), "🟩🟩⬛⬛⬛");
tap.equal(getResponse("abled", "abbey"), "🟩🟩⬛🟩⬛");
tap.equal(getResponse("rinse", "abbey"), "⬛⬛⬛⬛🟨");
tap.equal(getResponse("cheep", "abbey"), "⬛⬛⬛🟩⬛");
tap.equal(getResponse("weave", "abbey"), "⬛🟨🟨⬛⬛");
tap.equal(getResponse("abbey", "abbey"), "🟩🟩🟩🟩🟩");

const newGame = new Game("drink");

tap.equal(newGame.guess("snake"), "⬛🟨⬛🟨⬛");
tap.ok(newGame.remainingGuesses);
tap.notOk(newGame.lost);
tap.notOk(newGame.won);

tap.equal(newGame.guess("crest"), "⬛🟩⬛⬛⬛");
tap.ok(newGame.remainingGuesses);
tap.notOk(newGame.lost);
tap.notOk(newGame.won);

tap.equal(newGame.guess("kites"), "🟨🟨⬛⬛⬛");
tap.ok(newGame.remainingGuesses);
tap.notOk(newGame.lost);
tap.notOk(newGame.won);

tap.equal(newGame.guess("kites"), "🟨🟨⬛⬛⬛");
tap.ok(newGame.remainingGuesses);
tap.notOk(newGame.lost);
tap.notOk(newGame.won);

tap.equal(newGame.guess("kites"), "🟨🟨⬛⬛⬛");
tap.ok(newGame.remainingGuesses);
tap.notOk(newGame.lost);
tap.notOk(newGame.won);

tap.equal(newGame.guess("drink"), "🟩🟩🟩🟩🟩");
tap.notOk(newGame.remainingGuesses);
tap.notOk(newGame.lost);
tap.ok(newGame.won);
