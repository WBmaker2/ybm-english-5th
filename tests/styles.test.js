import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("styles.css keeps hidden elements visually hidden", () => {
  const styles = readFileSync(new URL("../styles.css", import.meta.url), "utf8");

  assert.match(styles, /\[hidden\]\s*\{\s*display:\s*none\s*!important;\s*\}/);
});

test("styles.css supports a four-column lesson board on desktop and collapses on mobile", () => {
  const styles = readFileSync(new URL("../styles.css", import.meta.url), "utf8");

  assert.match(styles, /\.card-grid\[data-columns="4"\]\s*\{\s*grid-template-columns:\s*repeat\(4,\s*minmax\(0,\s*1fr\)\);\s*\}/);
  assert.match(
    styles,
    /@media\s*\(max-width:\s*720px\)[\s\S]*?\.card-grid\[data-columns="4"\]\s*\{\s*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\);\s*\}/
  );
});
