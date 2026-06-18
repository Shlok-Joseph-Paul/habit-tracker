# Habit Tracker Architecture

## Overview
This repo will host a tiny frontend-only Habit Tracker. The architecture is intentionally simple so parallel work can happen with minimal merge risk.

## Proposed File Layout
```text
/
  index.html
  src/
    app.js
    habits.js
    storage.js
    styles.css
  SPEC.md
  ARCHITECTURE.md
  TASK_BOARD.md
  AGENTS.md
```

## Module Responsibilities

### `index.html`
- Defines the static page shell
- Loads the stylesheet
- Loads the JavaScript entry point
- Contains semantic placeholders that the app can target

### `src/app.js`
- App entry point
- Renders the habit list into the page shell
- Wires UI events to data operations
- Coordinates calls into `habits.js` and `storage.js`

### `src/habits.js`
- Owns the habit data shape
- Exposes default data and pure helper functions
- Should avoid direct DOM and `localStorage` access

### `src/storage.js`
- Encapsulates `localStorage` reads and writes
- Handles serialization and deserialization
- Provides a small API used by `app.js`

### `src/styles.css`
- Owns all app presentation
- Should not require JavaScript logic changes except for class names already reserved by the UI shell

## Data Flow
1. `index.html` loads the page shell.
2. `src/app.js` initializes the app.
3. `src/app.js` requests saved data from `src/storage.js`.
4. If no saved data exists, `src/app.js` uses defaults from `src/habits.js`.
5. User interactions update in-memory habit state.
6. Updated state is persisted through `src/storage.js`.
7. `src/app.js` re-renders the visible habit state.

## Proposed Data Shape
```js
{
  date: "YYYY-MM-DD",
  habits: [
    {
      id: "drink-water",
      name: "Drink water",
      completed: false
    }
  ]
}
```

## Separation Rules For Parallel Work
- `index.html` is reserved for the UI skeleton ticket
- `src/habits.js` is reserved for the habit data model ticket
- `src/storage.js` is reserved for the persistence ticket
- `src/styles.css` is reserved for the styling ticket
- QA work should not modify product code unless a follow-up bug ticket is created
- `src/app.js` is the main integration surface and should be touched only by the UI skeleton ticket at first

## Integration Strategy
- Establish DOM anchors in `index.html` and `src/app.js` first
- Keep module APIs narrow and predictable
- Favor pure functions in `src/habits.js`
- Keep `src/storage.js` defensive around malformed saved data

## Risks
- If multiple tickets edit `src/app.js`, merge conflicts become likely
- If CSS depends on markup that is not established early, styling work may drift
- If the data model and persistence format diverge, reload bugs will appear

## Mitigations
- Reserve file ownership by ticket
- Define selectors and data shape in docs before implementation
- Keep QA as a separate verification track with bug reports instead of ad hoc edits
