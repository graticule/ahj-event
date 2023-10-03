/**
 * @jest-environment jsdom
 */

import Game from "./game";

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
    </div>
    <div class="field"></div>`
);
const game = new Game(element);

test("check number of cells", () => {
  expect(element.querySelectorAll(".game__row").length).toBe(4);
  expect(element.querySelectorAll(".game__cell").length).toBe(16);
});

test("change position test", () => {
  expect(element.querySelectorAll(".game__cell_active").length).toBe(0);
  let prev = element.querySelector(".game__cell_active");
  expect(prev).toBeNull();
  game.changePosition();
  for (let i = 0; i < 10; i++) {
    prev = element.querySelector(".game__cell_active");
    game.changePosition();
    const next = element.querySelector(".game__cell_active");
    expect(prev.isEqualNode(next)).toBeFalsy();
    expect(element.querySelectorAll(".game__cell_active").length).toBe(1);
  }
});
