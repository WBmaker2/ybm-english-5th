# Golden Bell Web App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dependency-free web app that shows five lesson images in a 3x2 card board, draws one random card per turn with animation and sound, tracks drawn order, and supports round reset and full reset.

**Architecture:** Use a small static site served by a simple Node HTTP server. Keep the game state in a pure ES module that manages rounds, remaining cards, draw order, and reset behavior. Drive the DOM from a browser module that reads this state and renders the board, selected hero card, and controls.

**Tech Stack:** HTML, CSS, vanilla JavaScript ES modules, Node built-in test runner, Node built-in HTTP server

---

### Task 1: Project Skeleton

**Files:**
- Create: `D:\Codex\ybm-5th-lesson2\package.json`
- Create: `D:\Codex\ybm-5th-lesson2\server.js`

- [ ] **Step 1: Add package metadata and scripts**
- [ ] **Step 2: Add a tiny static server for local execution**
- [ ] **Step 3: Verify the server script can be parsed by Node**

### Task 2: Game State TDD

**Files:**
- Create: `D:\Codex\ybm-5th-lesson2\tests\game-state.test.js`
- Create: `D:\Codex\ybm-5th-lesson2\src\game-state.js`

- [ ] **Step 1: Write failing tests for initial state, unique draws, round rollover, and reset**
- [ ] **Step 2: Run `node --test` and confirm failure because the module does not exist yet**
- [ ] **Step 3: Implement the minimal pure game-state module**
- [ ] **Step 4: Run `node --test` again and confirm all tests pass**

### Task 3: Browser UI

**Files:**
- Create: `D:\Codex\ybm-5th-lesson2\index.html`
- Create: `D:\Codex\ybm-5th-lesson2\styles.css`
- Create: `D:\Codex\ybm-5th-lesson2\src\app.js`
- Create: `D:\Codex\ybm-5th-lesson2\src\sound.js`

- [ ] **Step 1: Add semantic layout for header, board, hero panel, and controls**
- [ ] **Step 2: Style the board as a 3x2 layout with one status card**
- [ ] **Step 3: Render image cards from the known five assets**
- [ ] **Step 4: Connect draw and reset buttons to game-state actions**
- [ ] **Step 5: Add draw animation and Web Audio sound effect**
- [ ] **Step 6: Ensure drawn order badges and state panel update correctly**

### Task 4: End-to-End Verification

**Files:**
- Verify: `D:\Codex\ybm-5th-lesson2\index.html`
- Verify: `D:\Codex\ybm-5th-lesson2\src\app.js`
- Verify: `D:\Codex\ybm-5th-lesson2\src\game-state.js`
- Verify: `D:\Codex\ybm-5th-lesson2\styles.css`

- [ ] **Step 1: Run `& 'C:\Program Files\nodejs\node.exe' --test`**
- [ ] **Step 2: Run `& 'C:\Program Files\nodejs\node.exe' --check server.js`**
- [ ] **Step 3: Run `& 'C:\Program Files\nodejs\node.exe' server.js` briefly to confirm the app serves without startup errors**
- [ ] **Step 4: Report exact verification results and any remaining manual checks**
