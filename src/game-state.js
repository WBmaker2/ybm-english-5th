function shuffleCards(cardIds, randomFn) {
  const deck = [...cardIds];

  for (let index = deck.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(randomFn() * (index + 1));
    [deck[index], deck[swapIndex]] = [deck[swapIndex], deck[index]];
  }

  return deck;
}

function buildState(cardIds, randomFn, round) {
  return {
    cardIds: [...cardIds],
    randomFn,
    round,
    selectedCardId: null,
    drawnOrder: [],
    drawnMap: {},
    remainingDeck: shuffleCards(cardIds, randomFn),
    remainingCount: cardIds.length
  };
}

export function createGameState(cardIds, randomFn = Math.random) {
  return buildState(cardIds, randomFn, 1);
}

export function drawNextCard(state) {
  let workingState = state;

  if (workingState.remainingDeck.length === 0) {
    workingState = buildState(
      workingState.cardIds,
      workingState.randomFn,
      workingState.round + 1
    );
  }

  const [nextCardId, ...remainingDeck] = workingState.remainingDeck;
  const drawOrder = workingState.drawnOrder.length + 1;

  return {
    ...workingState,
    selectedCardId: nextCardId,
    drawnOrder: [...workingState.drawnOrder, nextCardId],
    drawnMap: {
      ...workingState.drawnMap,
      [nextCardId]: drawOrder
    },
    remainingDeck,
    remainingCount: remainingDeck.length
  };
}

export function resetCurrentRound(state) {
  return buildState(state.cardIds, state.randomFn, 1);
}
