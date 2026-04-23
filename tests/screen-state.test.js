import test from "node:test";
import assert from "node:assert/strict";

import {
  createGradeScreen,
  createLessonScreen,
  getHashForScreen,
  getScreenFromHash
} from "../src/screen-state.js";

test("getScreenFromHash falls back to the homepage for empty or unknown hashes", () => {
  assert.deepEqual(getScreenFromHash(""), { name: "home" });
  assert.deepEqual(getScreenFromHash("#unknown"), { name: "home" });
});

test("getScreenFromHash parses lesson routes", () => {
  assert.deepEqual(getScreenFromHash("#lesson/lesson2"), {
    name: "lesson",
    lessonId: "lesson2"
  });
});

test("getScreenFromHash parses grade routes", () => {
  assert.deepEqual(getScreenFromHash("#grade/grade4"), {
    name: "grade",
    gradeId: "grade4"
  });
});

test("getHashForScreen builds stable lesson hashes", () => {
  assert.equal(getHashForScreen(createLessonScreen("lesson3")), "#lesson/lesson3");
  assert.equal(getHashForScreen(createGradeScreen("grade5")), "#grade/grade5");
  assert.equal(getHashForScreen({ name: "home" }), "#home");
});
