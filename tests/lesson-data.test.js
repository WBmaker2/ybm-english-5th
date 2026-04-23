import test from "node:test";
import assert from "node:assert/strict";

import {
  getGradeById,
  getLessonById,
  getLessonsByGradeId,
  grades,
  lessons
} from "../src/lesson-data.js";

test("grades exposes 4th grade, 5th grade, and 6th grade in landing order", () => {
  assert.deepEqual(
    grades.map((grade) => grade.id),
    ["grade4", "grade5", "grade6"]
  );
});

test("4th grade exposes the What time is it lesson with seven PDF cards", () => {
  const grade = getGradeById("grade4");
  const lesson = getLessonById("grade4-lesson3");

  assert.equal(grade.lessons.length, 1);
  assert.deepEqual(
    getLessonsByGradeId("grade4").map((item) => item.id),
    ["grade4-lesson3"]
  );
  assert.equal(lesson.title, "3단원 What time is it?");
  assert.equal(lesson.cards.length, 7);
  assert.equal(lesson.usesStatusCardGridSlot, true);
  assert.match(lesson.cards[0].src, /4th_grade\/lesson3 What time is it\/cards\/card-1\.png/);
});

test("lessons keeps 5th grade lesson 2 and lesson 3 available", () => {
  assert.deepEqual(
    getLessonsByGradeId("grade5").map((lesson) => lesson.id),
    ["lesson2", "lesson3"]
  );
  assert.deepEqual(
    lessons.map((lesson) => lesson.id),
    ["grade4-lesson3", "lesson2", "lesson3", "grade6-lesson4"]
  );
});

test("6th grade exposes the What's wrong lesson with four picture cards", () => {
  const grade = getGradeById("grade6");
  const lesson = getLessonById("grade6-lesson4");

  assert.equal(grade.lessons.length, 1);
  assert.deepEqual(
    getLessonsByGradeId("grade6").map((item) => item.id),
    ["grade6-lesson4"]
  );
  assert.equal(lesson.title, "4단원 What's wrong?");
  assert.equal(lesson.cards.length, 4);
  assert.equal(lesson.usesStatusCardGridSlot, true);
  assert.match(lesson.cards[0].src, /6th_grade\/lesson4 What's wrong\/chrome_4CSEKiNqTP\.png/);
});

test("lesson 2 uses five cards and reserves one grid slot for status", () => {
  const lesson = getLessonById("lesson2");

  assert.equal(lesson.title, "Lesson 2");
  assert.equal(lesson.cards.length, 5);
  assert.equal(lesson.usesStatusCardGridSlot, true);
  assert.match(lesson.cards[0].src, /lesson2-pictures\//);
});

test("lesson 3 keeps six image cards in a 3 x 2 board and places status as a seventh slot", () => {
  const lesson = getLessonById("lesson3");

  assert.equal(lesson.title, "Lesson 3");
  assert.equal(lesson.cards.length, 6);
  assert.equal(lesson.usesStatusCardGridSlot, true);
  assert.equal(lesson.boardColumnCount, 3);
  assert.match(lesson.cards[0].src, /lesson3-pictures\//);
});
