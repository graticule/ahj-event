import Scoreboard from "../scoreboard/scoreboard";
// import "./game.css";

export default class Game {
  constructor(element, size = 4) {
    this.game = element;
    this.field = this.game.querySelector(".field");
    this.scoreboard = new Scoreboard(this.game.querySelector(".scoreboard"));
    this.banner = this.game.querySelector(".banner");
    this.cells = [];
    this.size = size;
    this.currentPosition = undefined;
    this.changePosition = this.changePosition.bind(this);
    this.checkClick = this.checkClick.bind(this);
    this.end = this.end.bind(this);
    this.start = this.start.bind(this);
    this.failHandle = this.failHandle.bind(this);
    this.init();
  }

  init() {
    for (let i = 0; i < this.size; i++) {
      const row = document.createElement("div");
      row.classList.add("game__row");
      for (let j = 0; j < this.size; j++) {
        const cell = document.createElement("div");
        cell.classList.add("game__cell");
        this.cells.push(cell);
        row.appendChild(cell);
      }
      this.field.appendChild(row);

      this.score = 0;
    }
  }

  _generatePosition() {
    let newPosition = this.currentPosition;
    while (newPosition === this.currentPosition) {
      newPosition = Math.floor(Math.random() * this.cells.length);
    }
    return newPosition;
  }

  changePosition() {
    if (this.currentPosition !== undefined) {
      this.cells[this.currentPosition].classList.remove("game__cell_active");
    }
    this.currentPosition = this._generatePosition();
    this.cells[this.currentPosition].classList.add("game__cell_active");
  }

  start() {
    this.banner.style.display = "none";
    this.scoreboard.reset();
    this.field.addEventListener("click", this.checkClick);
    this.startTimer();
  }

  startTimer() {
    this.changePosition();
    this.timer = setTimeout(this.failHandle, 1000);
  }

  failHandle() {
    this.scoreboard.fail += 1;
    if (this.scoreboard.fail >= 5) {
      clearInterval(this.timer);
      this.end();
      return;
    }
    this.startTimer();
  }

  checkClick(e) {
    clearInterval(this.timer);
    const active = e.target.closest(".game__cell_active");
    if (active) {
      this.scoreboard.score += 1;
      this.startTimer();
    } else {
      this.failHandle();
    }
  }

  end() {
    this.field.removeEventListener("click", this.checkClick);
    this.banner.style.display = "block";
    this.cells[this.currentPosition].classList.remove("game__cell_active");
    this.currentPosition = undefined;
  }
}
