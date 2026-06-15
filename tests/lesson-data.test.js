import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";

import {
  getGradeById,
  getLessonById,
  getLessonsByGradeId,
  grades,
  lessons
} from "../src/lesson-data.js";

test("grades exposes 3rd grade, 4th grade, 5th grade, and 6th grade in landing order", () => {
  assert.deepEqual(
    grades.map((grade) => grade.id),
    ["grade3", "grade4", "grade5", "grade6"]
  );
});

test("3rd grade exposes lesson 3 missions with PDF cards", () => {
  const grade = getGradeById("grade3");
  const lesson = getLessonById("grade3-lesson3");
  const mission2 = getLessonById("grade3-lesson3-mission2");

  assert.equal(grade.lessons.length, 2);
  assert.deepEqual(
    getLessonsByGradeId("grade3").map((item) => item.id),
    ["grade3-lesson3", "grade3-lesson3-mission2"]
  );
  assert.equal(lesson.title, "Lesson 3 Mission 1");
  assert.equal(lesson.cards.length, 4);
  assert.equal(lesson.usesStatusCardGridSlot, true);
  assert.deepEqual(
    lesson.cards.map((card) => card.title),
    ["Open the door", "Don't run", "Look", "Sit down"]
  );
  assert.match(lesson.cards[0].src, /3rd_grade\/lesson3\/cards\/card-1\.png/);

  assert.equal(mission2.title, "Lesson 3 Mission 2");
  assert.equal(mission2.cards.length, 7);
  assert.equal(mission2.usesStatusCardGridSlot, true);
  assert.equal(mission2.boardColumnCount, 3);
  assert.deepEqual(
    mission2.cards.map((card) => card.title),
    [
      "Come here",
      "Close the door",
      "Stand up",
      "Sit down",
      "Open the door",
      "Don't run",
      "Look"
    ]
  );
  const expectedSources = Array.from(
    { length: 7 },
    (_, index) => `./3rd_grade/lesson3/mission2/cards/card-${index + 1}.png`
  );

  assert.deepEqual(
    mission2.cards.map((card) => card.src),
    expectedSources
  );
  for (const source of expectedSources) {
    assert.equal(
      existsSync(new URL(`../${source.slice(2)}`, import.meta.url)),
      true,
      `${source} should exist`
    );
  }
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

test("lessons keeps 5th grade lesson 2, lesson 3, and lesson 5 available", () => {
  assert.deepEqual(
    getLessonsByGradeId("grade5").map((lesson) => lesson.id),
    ["lesson2", "lesson3", "grade5-lesson5"]
  );
  assert.deepEqual(
    lessons.map((lesson) => lesson.id),
    [
      "grade3-lesson3",
      "grade3-lesson3-mission2",
      "grade4-lesson3",
      "lesson2",
      "lesson3",
      "grade5-lesson5",
      "grade6-lesson4",
      "grade6-lesson5",
      "grade6-lesson6"
    ]
  );
});

test("5th grade exposes lesson 5 with five object picture cards from the PPT", () => {
  const grade = getGradeById("grade5");
  const lesson = getLessonById("grade5-lesson5");

  assert.equal(grade.lessons.length, 3);
  assert.equal(lesson.title, "Lesson 5");
  assert.equal(lesson.cards.length, 5);
  assert.equal(lesson.usesStatusCardGridSlot, true);
  assert.equal(lesson.boardColumnCount, 3);
  assert.deepEqual(
    lesson.cards.map((card) => card.title),
    ["bottle", "cell phone", "umbrella", "glove", "watch"]
  );
  assert.match(lesson.cards[0].src, /5th_grade\/lesson5\/cards\/card-1\.png/);
});

test("6th grade exposes the What's wrong lesson with four picture cards", () => {
  const grade = getGradeById("grade6");
  const lesson = getLessonById("grade6-lesson4");

  assert.equal(grade.lessons.length, 3);
  assert.deepEqual(
    getLessonsByGradeId("grade6").map((item) => item.id),
    ["grade6-lesson4", "grade6-lesson5", "grade6-lesson6"]
  );
  assert.equal(lesson.title, "4단원 What's wrong?");
  assert.equal(lesson.cards.length, 4);
  assert.equal(lesson.usesStatusCardGridSlot, true);
  assert.match(lesson.cards[0].src, /6th_grade\/lesson4 What's wrong\/chrome_4CSEKiNqTP\.png/);
});

test("6th grade exposes lesson 5 with seven picture cards from the revised PPT", () => {
  const lesson = getLessonById("grade6-lesson5");

  assert.equal(lesson?.title, "5단원 Who painted this picture?");
  assert.equal(lesson?.cards.length, 7);
  assert.equal(lesson?.usesStatusCardGridSlot, true);
  assert.equal(lesson?.boardColumnCount, 3);
  assert.deepEqual(
    lesson?.cards.map((card) => card.title),
    [
      "Picture 1",
      "Picture 2",
      "Picture 3",
      "Picture 4",
      "Picture 5",
      "Picture 6",
      "Picture 7"
    ]
  );
  const expectedSources = Array.from(
    { length: 7 },
    (_, index) =>
      `./6th_grade/lesson5 Who painted this picture/cards/card-${index + 1}.png`
  );

  assert.deepEqual(
    lesson?.cards.map((card) => card.src),
    expectedSources
  );
  for (const source of expectedSources) {
    assert.equal(
      existsSync(new URL(`../${source.slice(2)}`, import.meta.url)),
      true,
      `${source} should exist`
    );
  }
});

test("6th grade exposes lesson 6 with six picture cards from the source PNG", () => {
  const lesson = getLessonById("grade6-lesson6");

  assert.equal(lesson?.title, "6단원 I'm going to play soccer");
  assert.equal(lesson?.cards.length, 6);
  assert.equal(lesson?.usesStatusCardGridSlot, true);
  assert.equal(lesson?.boardColumnCount, 3);
  assert.deepEqual(
    lesson?.cards.map((card) => card.title),
    ["Picture 1", "Picture 2", "Picture 3", "Picture 4", "Picture 5", "Picture 6"]
  );
  const expectedSources = Array.from(
    { length: 6 },
    (_, index) =>
      `./6th_grade/lesson6 I'm going to play soccer/cards/card-${index + 1}.png`
  );

  assert.deepEqual(
    lesson?.cards.map((card) => card.src),
    expectedSources
  );
  for (const source of expectedSources) {
    assert.equal(
      existsSync(new URL(`../${source.slice(2)}`, import.meta.url)),
      true,
      `${source} should exist`
    );
  }
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
