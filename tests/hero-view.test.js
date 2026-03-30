import test from "node:test";
import assert from "node:assert/strict";

import { createHeroMediaView } from "../src/hero-view.js";

test("createHeroMediaView clears the hero image when no card is selected", () => {
  const mediaView = createHeroMediaView({ selectedCard: null, drawOrder: null });

  assert.deepEqual(mediaView, {
    placeholderHidden: false,
    imageHidden: true,
    imageSrc: "",
    imageAlt: "",
    badgeHidden: true,
    badgeText: ""
  });
});

test("createHeroMediaView populates the hero image when a card is selected", () => {
  const mediaView = createHeroMediaView({
    selectedCard: {
      title: "Card 1",
      src: "./pictures/example.png"
    },
    drawOrder: 3
  });

  assert.deepEqual(mediaView, {
    placeholderHidden: true,
    imageHidden: false,
    imageSrc: "./pictures/example.png",
    imageAlt: "Card 1 크게 보기",
    badgeHidden: false,
    badgeText: "3번째 카드"
  });
});
