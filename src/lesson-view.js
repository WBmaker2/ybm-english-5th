export function buildLessonViewModel({ lesson, state }) {
  const cardById = new Map(lesson.cards.map((card) => [card.id, card]));
  const boardItems = lesson.cards.map((card) => ({
    type: "card",
    card,
    drawOrder: state.drawnMap[card.id] || null,
    isSelected: state.selectedCardId === card.id
  }));

  if (lesson.usesStatusCardGridSlot) {
    boardItems.push({ type: "status" });
  }

  return {
    boardColumnCount: lesson.boardColumnCount || 3,
    boardItems,
    showCardFooter: !lesson.imageCardsContainText,
    drawButtonLabel:
      state.remainingCount === 0 && state.selectedCardId ? "다음 라운드 추첨" : "랜덤 뽑기",
    lastCardTitle: state.selectedCardId
      ? cardById.get(state.selectedCardId)?.title || "그림 카드"
      : "아직 없음"
  };
}
