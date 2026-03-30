import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("styles.css keeps hidden elements visually hidden", () => {
  const styles = readFileSync(new URL("../styles.css", import.meta.url), "utf8");

  assert.match(styles, /\[hidden\]\s*\{\s*display:\s*none\s*!important;\s*\}/);
});
