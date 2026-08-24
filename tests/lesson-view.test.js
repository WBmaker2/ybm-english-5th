import test from "node:test";
import assert from "node:assert/strict";

import { createGameState, drawNextCard } from "../src/game-state.js";
import { getLessonById } from "../src/lesson-data.js";
import { buildLessonViewModel } from "../src/lesson-view.js";

test("buildLessonViewModel reserves a status slot for lesson 2", () => {
  const lesson = getLessonById("lesson2");
  const state = createGameState(lesson.cards.map((card) => card.id), () => 0);

  const viewModel = buildLessonViewModel({ lesson, state });

  assert.equal(viewModel.boardItems.length, 6);
  assert.equal(viewModel.boardItems.filter((item) => item.type === "card").length, 5);
  assert.equal(viewModel.boardItems.at(-1).type, "status");
});

test("buildLessonViewModel keeps 3rd grade lesson 3 at four image cards plus grid status", () => {
  const lesson = getLessonById("grade3-lesson3");
  const state = createGameState(lesson.cards.map((card) => card.id), () => 0);

  const viewModel = buildLessonViewModel({ lesson, state });

  assert.equal(viewModel.boardItems.length, 5);
  assert.equal(viewModel.boardItems.filter((item) => item.type === "card").length, 4);
  assert.equal(viewModel.boardItems.at(-1).type, "status");
  assert.equal(viewModel.boardColumnCount, 3);
});

test("buildLessonViewModel keeps 3rd grade lesson 3 mission 2 at seven image cards plus grid status", () => {
  const lesson = getLessonById("grade3-lesson3-mission2");
  const state = createGameState(lesson.cards.map((card) => card.id), () => 0);

  const viewModel = buildLessonViewModel({ lesson, state });

  assert.equal(viewModel.boardItems.length, 8);
  assert.equal(viewModel.boardItems.filter((item) => item.type === "card").length, 7);
  assert.equal(viewModel.boardItems.at(-1).type, "status");
  assert.equal(viewModel.boardColumnCount, 3);
});

test("buildLessonViewModel keeps lesson 3 at three columns and appends status after six cards", () => {
  const lesson = getLessonById("lesson3");
  const state = createGameState(lesson.cards.map((card) => card.id), () => 0);

  const viewModel = buildLessonViewModel({ lesson, state });

  assert.equal(viewModel.boardItems.length, 7);
  assert.equal(viewModel.boardItems.filter((item) => item.type === "card").length, 6);
  assert.equal(viewModel.boardItems.at(-1).type, "status");
  assert.equal(viewModel.boardColumnCount, 3);
});

test("buildLessonViewModel keeps 5th grade lesson 5 at five object cards plus grid status", () => {
  const lesson = getLessonById("grade5-lesson5");
  const state = createGameState(lesson.cards.map((card) => card.id), () => 0);

  const viewModel = buildLessonViewModel({ lesson, state });

  assert.equal(viewModel.boardItems.length, 6);
  assert.equal(viewModel.boardItems.filter((item) => item.type === "card").length, 5);
  assert.equal(viewModel.boardItems.at(-1).type, "status");
  assert.equal(viewModel.boardColumnCount, 3);
});

test("buildLessonViewModel keeps 5th grade lesson 6 at four image cards plus grid status", () => {
  const lesson = getLessonById("grade5-lesson6");
  const state = createGameState(lesson.cards.map((card) => card.id), () => 0);

  const viewModel = buildLessonViewModel({ lesson, state });

  assert.equal(viewModel.boardItems.length, 5);
  assert.equal(viewModel.boardItems.filter((item) => item.type === "card").length, 4);
  assert.equal(viewModel.boardItems.at(-1).type, "status");
  assert.equal(viewModel.boardColumnCount, 3);
});

test("buildLessonViewModel keeps 5th grade lesson 7 period 1 at six image cards plus grid status", () => {
  const lesson = getLessonById("grade5-lesson7-period1");
  const state = createGameState(lesson.cards.map((card) => card.id), () => 0);

  const viewModel = buildLessonViewModel({ lesson, state });

  assert.equal(viewModel.boardItems.length, 7);
  assert.equal(viewModel.boardItems.filter((item) => item.type === "card").length, 6);
  assert.equal(viewModel.boardItems.at(-1).type, "status");
  assert.equal(viewModel.boardColumnCount, 3);
});

test("buildLessonViewModel keeps 4th grade lesson 3 at seven image cards plus grid status", () => {
  const lesson = getLessonById("grade4-lesson3");
  const state = createGameState(lesson.cards.map((card) => card.id), () => 0);

  const viewModel = buildLessonViewModel({ lesson, state });

  assert.equal(viewModel.boardItems.length, 8);
  assert.equal(viewModel.boardItems.filter((item) => item.type === "card").length, 7);
  assert.equal(viewModel.boardItems.at(-1).type, "status");
  assert.equal(viewModel.boardColumnCount, 3);
});

test("buildLessonViewModel keeps 4th grade lesson 5 mission 2 at ten object cards plus grid status", () => {
  const lesson = getLessonById("grade4-lesson5-mission2");
  const state = createGameState(lesson.cards.map((card) => card.id), () => 0);

  const viewModel = buildLessonViewModel({ lesson, state });

  assert.equal(viewModel.boardItems.length, 11);
  assert.equal(viewModel.boardItems.filter((item) => item.type === "card").length, 10);
  assert.equal(viewModel.boardItems.at(-1).type, "status");
  assert.equal(viewModel.boardColumnCount, 3);
});

test("buildLessonViewModel keeps 6th grade lesson 4 at four image cards plus grid status", () => {
  const lesson = getLessonById("grade6-lesson4");
  const state = createGameState(lesson.cards.map((card) => card.id), () => 0);

  const viewModel = buildLessonViewModel({ lesson, state });

  assert.equal(viewModel.boardItems.length, 5);
  assert.equal(viewModel.boardItems.filter((item) => item.type === "card").length, 4);
  assert.equal(viewModel.boardItems.at(-1).type, "status");
  assert.equal(viewModel.boardColumnCount, 3);
});

test("buildLessonViewModel keeps 6th grade lesson 5 at seven image cards plus grid status", () => {
  const lesson = getLessonById("grade6-lesson5");
  const state = createGameState(lesson.cards.map((card) => card.id), () => 0);

  const viewModel = buildLessonViewModel({ lesson, state });

  assert.equal(viewModel.boardItems.length, 8);
  assert.equal(viewModel.boardItems.filter((item) => item.type === "card").length, 7);
  assert.equal(viewModel.boardItems.at(-1).type, "status");
  assert.equal(viewModel.boardColumnCount, 3);
});

test("buildLessonViewModel keeps 6th grade lesson 6 at six image cards plus grid status", () => {
  const lesson = getLessonById("grade6-lesson6");
  const state = createGameState(lesson.cards.map((card) => card.id), () => 0);

  const viewModel = buildLessonViewModel({ lesson, state });

  assert.equal(viewModel.boardItems.length, 7);
  assert.equal(viewModel.boardItems.filter((item) => item.type === "card").length, 6);
  assert.equal(viewModel.boardItems.at(-1).type, "status");
  assert.equal(viewModel.boardColumnCount, 3);
});

test("buildLessonViewModel keeps 6th grade lesson 6 period 3 at nine image cards plus grid status", () => {
  const lesson = getLessonById("grade6-lesson6-period3");
  const state = createGameState(lesson.cards.map((card) => card.id), () => 0);

  const viewModel = buildLessonViewModel({ lesson, state });

  assert.equal(viewModel.boardItems.length, 10);
  assert.equal(viewModel.boardItems.filter((item) => item.type === "card").length, 9);
  assert.equal(viewModel.boardItems.at(-1).type, "status");
  assert.equal(viewModel.boardColumnCount, 3);
  assert.equal(viewModel.showCardFooter, false);
});

test("buildLessonViewModel keeps 6th grade lesson 7 period 1 at twelve image cards plus grid status", () => {
  const lesson = getLessonById("grade6-lesson7-period1");
  const state = createGameState(lesson.cards.map((card) => card.id), () => 0);

  const viewModel = buildLessonViewModel({ lesson, state });

  assert.equal(viewModel.boardItems.length, 13);
  assert.equal(viewModel.boardItems.filter((item) => item.type === "card").length, 12);
  assert.equal(viewModel.boardItems.at(-1).type, "status");
  assert.equal(viewModel.boardColumnCount, 3);
  assert.equal(viewModel.showCardFooter, true);
});

test("buildLessonViewModel updates the draw button label after a round is exhausted", () => {
  const lesson = getLessonById("lesson3");
  let state = createGameState(lesson.cards.map((card) => card.id), () => 0);

  for (let count = 0; count < lesson.cards.length; count += 1) {
    state = drawNextCard(state);
  }

  const viewModel = buildLessonViewModel({ lesson, state });

  assert.equal(viewModel.drawButtonLabel, "다음 라운드 추첨");
  assert.equal(viewModel.lastCardTitle.startsWith("그림"), true);
});
