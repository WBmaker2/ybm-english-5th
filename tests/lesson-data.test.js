import test from "node:test";
import assert from "node:assert/strict";

import { getLessonById, lessons } from "../src/lesson-data.js";

test("lessons exposes lesson 2 and lesson 3 in selection order", () => {
  assert.deepEqual(
    lessons.map((lesson) => lesson.id),
    ["lesson2", "lesson3"]
  );
});

test("lesson 2 uses five cards and reserves one grid slot for status", () => {
  const lesson = getLessonById("lesson2");

  assert.equal(lesson.title, "Lesson 2");
  assert.equal(lesson.cards.length, 5);
  assert.equal(lesson.usesStatusCardGridSlot, true);
  assert.match(lesson.cards[0].src, /lesson2-pictures\//);
});

test("lesson 3 uses six cards and fills the full 3x2 board with images", () => {
  const lesson = getLessonById("lesson3");

  assert.equal(lesson.title, "Lesson 3");
  assert.equal(lesson.cards.length, 6);
  assert.equal(lesson.usesStatusCardGridSlot, false);
  assert.match(lesson.cards[0].src, /lesson3-pictures\//);
});
