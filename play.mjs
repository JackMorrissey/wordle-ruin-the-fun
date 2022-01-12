// 🟨🟨⬛⬛🟩

export class Game {
  constructor(answer) {
    this.answer = answer;
    this.remainingGuesses = 6;
    this.lost = false;
    this.won = false;
  }
  guess(word) {
    if (this.lost || this.won) {
      return;
    }
    const response = getResponse(word, this.answer);

    this.remainingGuesses--;
    if (response == "🟩🟩🟩🟩🟩") {
      this.won = true;
    } else if (!this.remainingGuesses) {
      this.lost = true;
    }
    return response;
  }
}

export function getResponse(test, answer) {
  const response = [];
  for (let i = 0; i < 5; i++) {
    if (test[i] === answer[i]) {
      response.push("🟩");
    } else if (answer.includes(test[i])) {
      response.push("🟨");
    } else {
      response.push("⬛");
    }
  }
  return response.join("");
}
