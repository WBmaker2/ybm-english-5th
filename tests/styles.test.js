import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("styles.css keeps hidden elements visually hidden", () => {
  const styles = readFileSync(new URL("../styles.css", import.meta.url), "utf8");

  assert.match(styles, /\[hidden\]\s*\{\s*display:\s*none\s*!important;\s*\}/);
});

test("styles.css keeps the board grid at the base three-column layout", () => {
  const styles = readFileSync(new URL("../styles.css", import.meta.url), "utf8");

  assert.match(styles, /\.card-grid\s*\{\s*display:\s*grid;\s*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\);\s*gap:\s*0\.95rem;\s*\}/);
  assert.doesNotMatch(styles, /\.card-grid\[data-columns="4"\]/);
});
