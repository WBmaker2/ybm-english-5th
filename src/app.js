import { createGameState, drawNextCard, resetCurrentRound } from "./game-state.js";
import { createHeroMediaView } from "./hero-view.js";
import { grades, getGradeById, getLessonById } from "./lesson-data.js";
import { buildLessonViewModel } from "./lesson-view.js";
import { getHashForScreen, getScreenFromHash } from "./screen-state.js";
import { createDrawSoundPlayer } from "./sound.js";

const homeScreen = document.querySelector("#home-screen");
const gameScreen = document.querySelector("#game-screen");
const lessonSelectionGrid = document.querySelector("#lesson-selection-grid");
const homeButton = document.querySelector("#home-button");
const headerContext = document.querySelector("#header-context");
const homeKicker = document.querySelector("#home-kicker");
const homeTitle = document.querySelector("#home-title");
const homeIntro = document.querySelector("#home-intro");
const homeHighlightLabel = document.querySelector("#home-highlight-label");
const homeHighlightTitle = document.querySelector("#home-highlight-title");
const homeHighlightBody = document.querySelector("#home-highlight-body");
const lessonKicker = document.querySelector("#lesson-kicker");
const lessonTitle = document.querySelector("#lesson-title");
const lessonDescription = document.querySelector("#lesson-description");
const boardTitle = document.querySelector("#board-title");
const boardNote = document.querySelector("#board-note");
const cardGrid = document.querySelector("#card-grid");
const drawButton = document.querySelector("#draw-button");
const resetButton = document.querySelector("#reset-button");
const stageNote = document.querySelector("#stage-note");
const focusStatusSlot = document.querySelector("#focus-status-slot");
const heroCard = document.querySelector("#hero-card");
const heroImage = document.querySelector("#hero-image");
const heroPlaceholder = document.querySelector("#hero-placeholder");
const heroBadge = document.querySelector("#hero-badge");
const heroRound = document.querySelector("#hero-round");
const heroTitle = document.querySelector("#hero-title");
const heroMessage = document.querySelector("#hero-message");
const liveStatus = document.querySelector("#live-status");

const lessonStateById = new Map();
const playDrawSound = createDrawSoundPlayer();

function getCardById(lesson, cardId) {
  return lesson.cards.find((card) => card.id === cardId) || null;
}

function getCardTitle(lesson, cardId) {
  return getCardById(lesson, cardId)?.title || "그림 카드";
}

function ensureLessonState(lesson) {
  if (!lessonStateById.has(lesson.id)) {
    lessonStateById.set(
      lesson.id,
      createGameState(lesson.cards.map((card) => card.id))
    );
  }

  return lessonStateById.get(lesson.id);
}

function setLessonState(lessonId, nextState) {
  lessonStateById.set(lessonId, nextState);
}

function getCurrentLesson() {
  const screen = getScreenFromHash(window.location.hash);

  if (screen.name !== "lesson") {
    return null;
  }

  return getLessonById(screen.lessonId);
}

function navigateToScreen(screen) {
  const nextHash = getHashForScreen(screen);

  if (window.location.hash === nextHash) {
    renderScreen();
    return;
  }

  window.location.hash = nextHash;
}

function getGradePreviewCard(grade) {
  return grade.lessons[0]?.cards[0] || null;
}

function renderGradeSelection() {
  lessonSelectionGrid.classList.add("is-grade-selection");
  lessonSelectionGrid.innerHTML = grades
    .map((grade) => {
      const previewCard = getGradePreviewCard(grade);

      return `
        <article class="lesson-option grade-option" data-grade-id="${grade.id}">
          <div class="lesson-option-media">
            <span class="lesson-count-badge">${grade.lessons.length} lesson</span>
            <button
              class="grade-media-button"
              type="button"
              data-grade-id="${grade.id}"
            >
              ${grade.title} 선택
            </button>
            ${
              previewCard
                ? `<img src="${previewCard.src}" alt="${grade.title} 대표 카드" />`
                : ""
            }
          </div>
          <div class="lesson-option-body">
            <p class="section-label">${grade.gradeLabel}</p>
            <h3>${grade.title}</h3>
            <p>${grade.homeDescription}</p>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderLessonSelection(grade) {
  lessonSelectionGrid.classList.remove("is-grade-selection");
  lessonSelectionGrid.innerHTML = grade.lessons
    .map(
      (lesson) => `
        <article class="lesson-option">
          <div class="lesson-option-media">
            <span class="lesson-count-badge">${lesson.cards.length} cards</span>
            <img src="${lesson.cards[0].src}" alt="${lesson.title} 대표 그림" />
          </div>
          <div class="lesson-option-body">
            <p class="section-label">${lesson.unitLabel}</p>
            <h3>${lesson.title}</h3>
            <p>${lesson.homeDescription}</p>
            <button
              class="action-button primary lesson-option-button"
              type="button"
              data-lesson-id="${lesson.id}"
            >
              ${lesson.title} 시작
            </button>
          </div>
        </article>
      `
    )
    .join("");
}

function renderStatusCardMarkup(lesson, state) {
  const lastCardTitle = state.selectedCardId ? getCardTitle(lesson, state.selectedCardId) : "아직 없음";
  const orderMarkup = state.drawnOrder.length
    ? `<ul class="order-list">${state.drawnOrder
        .map((cardId, index) => `<li>${index + 1}. ${getCardTitle(lesson, cardId)}</li>`)
        .join("")}</ul>`
    : `<p class="order-empty">아직 뽑힌 카드가 없어요. 랜덤 뽑기를 눌러 시작해 보세요.</p>`;

  return `
    <article class="status-card">
      <div>
        <p class="section-label">Game Status</p>
        <h3 class="status-headline">${lesson.title} 진행판</h3>
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

function renderBoard(lesson, state) {
  const viewModel = buildLessonViewModel({ lesson, state });
  const statusCardMarkup = renderStatusCardMarkup(lesson, state);
  cardGrid.dataset.columns = String(viewModel.boardColumnCount);

  cardGrid.innerHTML = viewModel.boardItems
    .map((item) => {
      if (item.type === "status") {
        return statusCardMarkup;
      }

      return `
        <article class="board-card ${item.drawOrder ? "is-drawn" : ""} ${item.isSelected ? "is-selected" : ""}" aria-label="${item.card.title}">
          <div class="card-image-shell">
            <img src="${item.card.src}" alt="${item.card.alt}" />
          </div>
          ${item.drawOrder ? `<span class="drawn-chip">뽑힘</span>` : ""}
          ${item.drawOrder ? `<span class="order-badge">${item.drawOrder}</span>` : ""}
          <div class="card-footer">
            <p>${item.drawOrder ? `${item.drawOrder}번째 순서` : "대기 중"}</p>
            <h3>${item.card.title}</h3>
          </div>
        </article>
      `;
    })
    .join("");

  focusStatusSlot.hidden = lesson.usesStatusCardGridSlot;
  focusStatusSlot.innerHTML = lesson.usesStatusCardGridSlot ? "" : statusCardMarkup;
  drawButton.textContent = viewModel.drawButtonLabel;
}

function animateHeroCard() {
  heroCard.classList.remove("is-revealed");
  void heroCard.offsetWidth;
  heroCard.classList.add("is-revealed");
}

function renderHero(lesson, state, action = "idle", roundAdvanced = false) {
  heroRound.textContent = `Round ${state.round}`;
  const selectedCard = state.selectedCardId ? getCardById(lesson, state.selectedCardId) : null;
  const drawOrder = state.selectedCardId ? state.drawnMap[state.selectedCardId] : null;
  const heroMediaView = createHeroMediaView({ selectedCard, drawOrder });

  heroPlaceholder.hidden = heroMediaView.placeholderHidden;
  heroImage.hidden = heroMediaView.imageHidden;
  heroImage.src = heroMediaView.imageSrc;
  heroImage.alt = heroMediaView.imageAlt;
  heroBadge.hidden = heroMediaView.badgeHidden;
  heroBadge.textContent = heroMediaView.badgeText;

  if (!selectedCard) {
    heroTitle.textContent = "준비 완료";
    heroMessage.textContent = `${lesson.cards.length}장은 한 라운드에 한 번씩만 뽑힙니다. 모두 뽑고 나면 다음 클릭에서 새 라운드가 시작됩니다.`;
    stageNote.textContent = `랜덤 뽑기를 눌러 ${lesson.title}의 첫 번째 카드를 선택하세요.`;
    liveStatus.textContent = `${lesson.title}이 초기 상태입니다.`;
    heroCard.classList.remove("is-revealed");
    return;
  }

  heroTitle.textContent = selectedCard.title;

  if (roundAdvanced) {
    heroMessage.textContent = `새 라운드가 시작됐어요. ${selectedCard.title}가 첫 번째 카드로 선택되었습니다.`;
    stageNote.textContent = `${lesson.title}의 새 라운드가 시작되었습니다. 남은 카드는 ${state.remainingCount}장입니다.`;
    liveStatus.textContent = `새 라운드 시작. ${selectedCard.title}가 첫 번째 카드입니다.`;
  } else {
    heroMessage.textContent = `${selectedCard.title}가 ${lesson.title} 라운드 ${state.round}의 ${drawOrder}번째 카드로 무대에 올랐습니다.`;
    stageNote.textContent = `현재 라운드에 남은 카드는 ${state.remainingCount}장입니다.`;
    liveStatus.textContent = `${selectedCard.title}가 선택되었습니다.`;
  }

  if (action === "draw") {
    animateHeroCard();
  }
}

function renderHomeScreen() {
  document.title = "YBM 영어 골든 벨";
  headerContext.textContent = "학년을 선택한 뒤 단원별 골든 벨 카드 게임을 시작할 수 있습니다.";
  homeKicker.textContent = "Grade Select";
  homeTitle.textContent = "학년을 선택하고 골든 벨 수업을 시작하세요.";
  homeIntro.textContent =
    "4학년, 5학년, 6학년 자료를 학년별로 선택해 같은 방식의 랜덤 카드 게임으로 이어갑니다.";
  homeHighlightLabel.textContent = "Ready Set";
  homeHighlightTitle.textContent = "학년별 자료를 같은 규칙으로";
  homeHighlightBody.textContent =
    "랜덤 뽑기, 중앙 무대, 효과음, 초기화 흐름은 그대로 유지하고 카드 자료만 단원에 맞게 바뀝니다.";
  homeButton.hidden = true;
  homeScreen.hidden = false;
  gameScreen.hidden = true;
  renderGradeSelection();
}

function renderGradeScreen(grade) {
  document.title = `${grade.title} | YBM 영어 골든 벨`;
  headerContext.textContent = `${grade.title} 자료를 선택하는 중입니다. 처음 화면으로 돌아가 다른 학년을 선택할 수 있습니다.`;
  homeKicker.textContent = "Lesson Select";
  homeTitle.textContent = grade.lessonSelectionTitle;
  homeIntro.textContent = grade.lessonSelectionDescription;
  homeHighlightLabel.textContent = grade.unitLabel;
  homeHighlightTitle.textContent = `${grade.title} 골든 벨 자료`;
  homeHighlightBody.textContent =
    "원하는 단원을 누르면 기존 랜덤 뽑기 화면으로 바로 이동합니다.";
  homeButton.hidden = false;
  homeScreen.hidden = false;
  gameScreen.hidden = true;
  renderLessonSelection(grade);
}

function renderGameScreen(lesson, action = "idle", roundAdvanced = false) {
  const state = ensureLessonState(lesson);

  document.title = `${lesson.title} | YBM 영어 골든 벨`;
  headerContext.textContent = `${lesson.title} 자료를 사용하는 중입니다. 홈으로 돌아가 다른 단원을 선택할 수 있습니다.`;
  homeButton.hidden = false;
  homeScreen.hidden = true;
  gameScreen.hidden = false;

  lessonKicker.textContent = `${lesson.gradeLabel} · ${lesson.unitLabel}`;
  lessonTitle.textContent = `${lesson.title} 골든 벨`;
  lessonDescription.textContent = lesson.gameDescription;
  boardTitle.textContent = lesson.boardTitle || `${lesson.cards.length}장 카드판`;
  boardNote.textContent = lesson.boardNote;

  renderBoard(lesson, state);
  renderHero(lesson, state, action, roundAdvanced);
}

function renderScreen() {
  const screen = getScreenFromHash(window.location.hash);

  if (screen.name === "lesson") {
    const lesson = getLessonById(screen.lessonId);

    if (lesson) {
      renderGameScreen(lesson);
      return;
    }
  }

  if (screen.name === "grade") {
    const grade = getGradeById(screen.gradeId);

    if (grade) {
      renderGradeScreen(grade);
      return;
    }
  }

  renderHomeScreen();
}

lessonSelectionGrid.addEventListener("click", (event) => {
  const gradeButton = event.target.closest("[data-grade-id]");

  if (gradeButton) {
    navigateToScreen({
      name: "grade",
      gradeId: gradeButton.dataset.gradeId
    });
    return;
  }

  const button = event.target.closest("[data-lesson-id]");

  if (!button) {
    return;
  }

  navigateToScreen({
    name: "lesson",
    lessonId: button.dataset.lessonId
  });
});

homeButton.addEventListener("click", () => {
  navigateToScreen({ name: "home" });
});

drawButton.addEventListener("click", () => {
  const lesson = getCurrentLesson();

  if (!lesson) {
    return;
  }

  const previousState = ensureLessonState(lesson);
  const nextState = drawNextCard(previousState);
  const roundAdvanced = nextState.round !== previousState.round;

  setLessonState(lesson.id, nextState);
  renderGameScreen(lesson, "draw", roundAdvanced);
  playDrawSound();
});

resetButton.addEventListener("click", () => {
  const lesson = getCurrentLesson();

  if (!lesson) {
    return;
  }

  const nextState = resetCurrentRound(ensureLessonState(lesson));
  setLessonState(lesson.id, nextState);
  renderGameScreen(lesson, "reset");
  stageNote.textContent = `${lesson.title}이 초기화되었습니다. 다시 랜덤 뽑기를 눌러 시작하세요.`;
  liveStatus.textContent = `${lesson.title}의 카드 순서가 모두 초기화되었습니다.`;
});

window.addEventListener("hashchange", () => {
  renderScreen();
});

renderScreen();
