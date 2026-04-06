# Multi-Lesson Golden Bell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the current Golden Bell web app so users can choose Lesson 2 or Lesson 3 from a homepage and play each lesson with the same shared random-draw engine.

**Architecture:** Keep one static HTML entry point, but separate lesson data, screen routing, and lesson-specific board layout into small ES modules. Reuse the existing game-state and audio logic while letting the UI switch between a homepage and a lesson game view.

**Tech Stack:** HTML, CSS, vanilla JavaScript ES modules, Node built-in test runner, Node static server

---

### Task 1: Document the lesson structure

**Files:**
- Create: `D:\Codex\ybm-5th-lesson2\docs\superpowers\specs\2026-04-06-multi-lesson-golden-bell-design.md`
- Create: `D:\Codex\ybm-5th-lesson2\docs\superpowers\plans\2026-04-06-multi-lesson-golden-bell.md`

- [ ] **Step 1: Capture the approved homepage + shared engine design**
- [ ] **Step 2: Record the file responsibilities and test scope**

### Task 2: Add failing tests for multi-lesson behavior

**Files:**
- Create: `D:\Codex\ybm-5th-lesson2\tests\lesson-data.test.js`
- Create: `D:\Codex\ybm-5th-lesson2\tests\screen-state.test.js`
- Create: `D:\Codex\ybm-5th-lesson2\tests\lesson-view.test.js`
- Create: `D:\Codex\ybm-5th-lesson2\src\lesson-data.js`
- Create: `D:\Codex\ybm-5th-lesson2\src\screen-state.js`
- Create: `D:\Codex\ybm-5th-lesson2\src\lesson-view.js`

- [ ] **Step 1: Write tests for lesson metadata, route parsing, and lesson board slots**
- [ ] **Step 2: Run the tests to confirm they fail because the new modules do not exist**
- [ ] **Step 3: Implement the minimal shared lesson modules**
- [ ] **Step 4: Run the tests again to confirm they pass**

### Task 3: Rebuild the UI around homepage + lesson screen states

**Files:**
- Modify: `D:\Codex\ybm-5th-lesson2\index.html`
- Modify: `D:\Codex\ybm-5th-lesson2\styles.css`
- Modify: `D:\Codex\ybm-5th-lesson2\src\app.js`
- Modify: `D:\Codex\ybm-5th-lesson2\package.json`

- [ ] **Step 1: Add homepage and lesson-screen containers to the HTML**
- [ ] **Step 2: Add homepage card styles and responsive layout updates**
- [ ] **Step 3: Connect lesson selection and home navigation in `app.js`**
- [ ] **Step 4: Reuse the shared game engine with lesson-specific data**
- [ ] **Step 5: Render Lesson 2 with a status card slot and Lesson 3 with six image cards**

### Task 4: Verify the full app

**Files:**
- Verify: `D:\Codex\ybm-5th-lesson2\src\app.js`
- Verify: `D:\Codex\ybm-5th-lesson2\src\lesson-data.js`
- Verify: `D:\Codex\ybm-5th-lesson2\src\screen-state.js`
- Verify: `D:\Codex\ybm-5th-lesson2\src\lesson-view.js`
- Verify: `D:\Codex\ybm-5th-lesson2\index.html`
- Verify: `D:\Codex\ybm-5th-lesson2\styles.css`

- [ ] **Step 1: Run the complete Node test suite**
- [ ] **Step 2: Run syntax checks on the updated browser modules and server**
- [ ] **Step 3: Start the local server and confirm the homepage HTML loads**
- [ ] **Step 4: Summarize manual checks still best viewed in a browser**
