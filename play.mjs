// 🟨🟨⬛⬛🟩

export class Game {
  constructor(answer) {
    this.answer = answer;
    this.remainingGuesses = 6;
    this.lost = false;
    this.won = false;
    this.guesses = [];
    this.responses = [];
  }
  guess(word) {
    if (this.lost || this.won) {
      return;
    }
    this.guesses.push(word);
    const response = getResponse(word, this.answer);
    this.responses.push(response);

    this.remainingGuesses--;
    if (response == "🟩🟩🟩🟩🟩") {
      this.won = true;
    } else if (!this.remainingGuesses) {
      this.lost = true;
    }
    return response;
  }
  print() {
    const toLog = this.guesses.map((guess, i) => {
      return { g: guess, r: this.responses[i] };
    });
    console.table(toLog);
  }
}

export function getResponse(test, answer) {
  const response = [];
  for (let i = 0; i < answer.length; i++) {
    response.push("?");
  }
  const notFound = [];
  for (let i = 0; i < answer.length; i++) {
    if (test[i] === answer[i]) {
      response[i] = "🟩";
    } else if (!answer.includes(test[i])) {
      notFound.push(answer[i]);
      response[i] = "⬛";
    } else {
      notFound.push(answer[i]);
    }
  }

  // Account for double letters. Wordle only does yellow for the count of any remaining unfound letters
  // e.g. guess of Creed for the answer Smear will have a green e and then a black e. Likewise for single yellow
  for (let i = 0; i < answer.length; i++) {
    if (response[i] !== "?") {
      continue;
    }
    const indexOfFound = notFound.indexOf(test[i]);
    if (indexOfFound > -1) {
      response[i] = "🟨";
      notFound.splice(indexOfFound, 1);
    } else {
      response[i] = "⬛";
    }
  }
  return response.join("");
}
