/**
 * @jest-environment jsdom
 */

import Scoreboard from "./scoreboard";

const element = document.createElement("div");
element.insertAdjacentHTML(
  "afterbegin",
  `<div class="scoreboard">
      <div class="scoreboard__element score">
        <div class="scoreboard__title score__title">Попадания:</div>
        <div class="scoreboard__number score__number"></div>
      </div>
      <div class="scoreboard__element fail">
        <div class="scoreboard__title fail__title">Промахи:</div>
        <div class="scoreboard__number fail__number"></div>
      </div>
    </div>`
);
const scoreboard = new Scoreboard(element.querySelector(".scoreboard"));

test("1", () => {
  expect(scoreboard.score).toBe(0);
  expect(scoreboard.fail).toBe(0);
});
