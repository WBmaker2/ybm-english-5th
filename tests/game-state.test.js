import test from "node:test";
import assert from "node:assert/strict";

import {
  createGameState,
  drawNextCard,
  resetCurrentRound
} from "../src/game-state.js";

test("createGameState starts with round one and no selected card", () => {
  const state = createGameState(["a", "b", "c", "d", "e"], () => 0.25);

  assert.equal(state.round, 1);
  assert.equal(state.selectedCardId, null);
  assert.deepEqual(state.drawnOrder, []);
  assert.equal(state.remainingCount, 5);
});

test("drawNextCard never repeats within a round and records draw order", () => {
  let index = 0;
  const randomValues = [0.2, 0.8, 0.1, 0.6];
  const random = () => randomValues[index++] ?? 0;
  let state = createGameState(["a", "b", "c", "d", "e"], random);

  const seen = [];

  for (let order = 1; order <= 5; order += 1) {
    state = drawNextCard(state);
    seen.push(state.selectedCardId);
    assert.equal(state.drawnMap[state.selectedCardId], order);
  }

  assert.equal(new Set(seen).size, 5);
  assert.equal(state.remainingCount, 0);
});

test("drawNextCard starts a new round automatically after all cards are used", () => {
  let index = 0;
  const randomValues = [0, 0, 0, 0, 0.5, 0.5, 0.5, 0.5];
  const random = () => randomValues[index++] ?? 0;
  let state = createGameState(["a", "b", "c", "d", "e"], random);

  for (let count = 0; count < 5; count += 1) {
    state = drawNextCard(state);
  }

  state = drawNextCard(state);

  assert.equal(state.round, 2);
  assert.equal(state.drawnOrder.length, 1);
  assert.equal(state.drawnMap[state.selectedCardId], 1);
  assert.equal(state.cardIds.includes(state.selectedCardId), true);
  assert.equal(state.remainingCount, 4);
});

test("resetCurrentRound clears the current progress and selected card", () => {
  const random = () => 0;
  let state = createGameState(["a", "b", "c", "d", "e"], random);

  state = drawNextCard(state);
  state = drawNextCard(state);
  state = resetCurrentRound(state);

  assert.equal(state.round, 1);
  assert.equal(state.selectedCardId, null);
  assert.deepEqual(state.drawnOrder, []);
  assert.deepEqual(state.drawnMap, {});
  assert.equal(state.remainingCount, 5);
});
