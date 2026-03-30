import { createGameState, drawNextCard, resetCurrentRound } from "./game-state.js";
import { createHeroMediaView } from "./hero-view.js";
import { createDrawSoundPlayer } from "./sound.js";

const cards = [
  {
    id: "card-1",
    title: "그림 1",
    src: "./pictures/Hpdf_8RYJVGrmA3.png",
    alt: "허락 골든 벨 게임 그림 카드 1"
  },
  {
    id: "card-2",
    title: "그림 2",
    src: "./pictures/Hpdf_iXRPHmceIk.png",
    alt: "허락 골든 벨 게임 그림 카드 2"
  },
  {
    id: "card-3",
    title: "그림 3",
    src: "./pictures/Hpdf_JY9QnLb8kn.png",
    alt: "허락 골든 벨 게임 그림 카드 3"
  },
  {
    id: "card-4",
    title: "그림 4",
    src: "./pictures/Hpdf_kZKJYy9cf2.png",
    alt: "허락 골든 벨 게임 그림 카드 4"
  },
  {
    id: "card-5",
    title: "그림 5",
    src: "./pictures/Hpdf_ZDBnsFkULR.png",
    alt: "허락 골든 벨 게임 그림 카드 5"
  }
];

const cardById = new Map(cards.map((card) => [card.id, card]));

const cardGrid = document.querySelector("#card-grid");
const drawButton = document.querySelector("#draw-button");
const resetButton = document.querySelector("#reset-button");
const stageNote = document.querySelector("#stage-note");
const heroCard = document.querySelector("#hero-card");
const heroImage = document.querySelector("#hero-image");
const heroPlaceholder = document.querySelector("#hero-placeholder");
const heroBadge = document.querySelector("#hero-badge");
const heroRound = document.querySelector("#hero-round");
const heroTitle = document.querySelector("#hero-title");
const heroMessage = document.querySelector("#hero-message");
const liveStatus = document.querySelector("#live-status");

const playDrawSound = createDrawSoundPlayer();

let state = createGameState(cards.map((card) => card.id));

function getCardTitle(cardId) {
  return cardById.get(cardId)?.title || "그림 카드";
}

function renderStatusCard() {
  const lastCardTitle = state.selectedCardId ? getCardTitle(state.selectedCardId) : "아직 없음";
  const orderMarkup = state.drawnOrder.length
    ? `<ul class="order-list">${state.drawnOrder
        .map(
          (cardId, index) =>
            `<li>${index + 1}. ${getCardTitle(cardId)}</li>`
        )
        .join("")}</ul>`
    : `<p class="order-empty">아직 뽑힌 카드가 없어요. 랜덤 뽑기를 눌러 시작해 보세요.</p>`;

  return `
    <article class="status-card">
      <div>
        <p class="section-label">Game Status</p>
        <h3 class="status-headline">골든 벨 진행판</h3>
      </div>
      <div class="status-meta">
        <div class="status-metric">
          <span>현재 라운드</span>
          <strong>${state.round}</strong>
        </div>
        <div class="status-metric">
          <span>남은 카드</span>
          <strong>${state.remainingCount}</strong>
        </div>
      </div>
      <div class="status-summary">
        <p class="section-label">Last Pick</p>
        <p>${lastCardTitle}</p>
      </div>
      <div>
        <p class="section-label">Draw Order</p>
        ${orderMarkup}
      </div>
    </article>
  `;
}

function renderBoard() {
  const cardMarkup = cards
    .map((card) => {
      const drawOrder = state.drawnMap[card.id];
      const classes = [
        "board-card",
        drawOrder ? "is-drawn" : "",
        state.selectedCardId === card.id ? "is-selected" : ""
      ]
        .filter(Boolean)
        .join(" ");

      return `
        <article class="${classes}" aria-label="${card.title}">
          <div class="card-image-shell">
            <img src="${card.src}" alt="${card.alt}" />
          </div>
          ${drawOrder ? `<span class="drawn-chip">뽑힘</span>` : ""}
          ${drawOrder ? `<span class="order-badge">${drawOrder}</span>` : ""}
          <div class="card-footer">
            <p>${drawOrder ? `${drawOrder}번째 순서` : "대기 중"}</p>
            <h3>${card.title}</h3>
          </div>
        </article>
      `;
    })
    .join("");

  cardGrid.innerHTML = `${cardMarkup}${renderStatusCard()}`;
}

function animateHeroCard() {
  heroCard.classList.remove("is-revealed");
  void heroCard.offsetWidth;
  heroCard.classList.add("is-revealed");
}

function renderHero(action = "idle", roundAdvanced = false) {
  heroRound.textContent = `Round ${state.round}`;
  const selectedCard = state.selectedCardId ? cardById.get(state.selectedCardId) : null;
  const drawOrder = state.selectedCardId ? state.drawnMap[state.selectedCardId] : null;
  const heroMediaView = createHeroMediaView({ selectedCard, drawOrder });

  heroPlaceholder.hidden = heroMediaView.placeholderHidden;
  heroImage.hidden = heroMediaView.imageHidden;
  heroImage.src = heroMediaView.imageSrc;
  heroImage.alt = heroMediaView.imageAlt;
  heroBadge.hidden = heroMediaView.badgeHidden;
  heroBadge.textContent = heroMediaView.badgeText;

  if (!state.selectedCardId) {
    heroTitle.textContent = "준비 완료";
    heroMessage.textContent =
      "다섯 장은 한 라운드에 한 번씩만 뽑힙니다. 다 뽑으면 다음 클릭에서 새 라운드가 시작됩니다.";
    stageNote.textContent = "랜덤 뽑기를 눌러 첫 번째 카드를 선택하세요.";
    liveStatus.textContent = "게임이 초기 상태입니다.";
    heroCard.classList.remove("is-revealed");
    return;
  }

  heroTitle.textContent = selectedCard.title;

  if (roundAdvanced) {
    heroMessage.textContent = `새 라운드가 시작됐어요. ${selectedCard.title}가 첫 번째 카드로 선택되었습니다.`;
    stageNote.textContent = `Round ${state.round}이 시작되었습니다. 남은 카드는 ${state.remainingCount}장입니다.`;
    liveStatus.textContent = `새 라운드 시작. ${selectedCard.title}가 첫 번째 카드입니다.`;
  } else {
    heroMessage.textContent = `${selectedCard.title}가 라운드 ${state.round}의 ${drawOrder}번째 카드로 무대에 올랐습니다.`;
    stageNote.textContent = `현재 라운드에 남은 카드는 ${state.remainingCount}장입니다.`;
    liveStatus.textContent = `${selectedCard.title}가 선택되었습니다.`;
  }

  if (action === "draw") {
    animateHeroCard();
  }
}

function renderControls() {
  drawButton.textContent =
    state.remainingCount === 0 && state.selectedCardId ? "다음 라운드 추첨" : "랜덤 뽑기";
}

function render(action = "idle", roundAdvanced = false) {
  renderBoard();
  renderHero(action, roundAdvanced);
  renderControls();
}

drawButton.addEventListener("click", () => {
  const previousRound = state.round;
  state = drawNextCard(state);
  const roundAdvanced = state.round !== previousRound;
  render("draw", roundAdvanced);
  playDrawSound();
});

resetButton.addEventListener("click", () => {
  state = resetCurrentRound(state);
  render("reset");
  stageNote.textContent = "초기화되었습니다. 다시 랜덤 뽑기를 눌러 시작하세요.";
  liveStatus.textContent = "모든 카드 순서가 초기화되었습니다.";
});

render();
