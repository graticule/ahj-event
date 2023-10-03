import "./scoreboard.css";

export default class Scoreboard {
  constructor(element) {
    this.scoreboard = element;
    this.scoreNumber = this.scoreboard.querySelector(".score__number");
    this.failNumber = this.scoreboard.querySelector(".fail__number");
    this._score = 0;
    this._fail = 0;
  }

  reset() {
    this.score = 0;
    this.fail = 0;
  }

  set score(score) {
    this._score = score;
    this.scoreNumber.innerText = score;
  }

  get score() {
    return this._score;
  }

  set fail(fail) {
    this._fail = fail;
    this.failNumber.innerText = fail;
  }

  get fail() {
    return this._fail;
  }
}
