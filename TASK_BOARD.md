# Task Board

## Ticket 1: UI skeleton

### Goal
Create the initial static app shell and integration entry point for a tiny Habit Tracker without implementing persistence details or final visual polish.

### Files Likely Touched
- `index.html`
- `src/app.js`

### Files Not To Touch
- `src/habits.js`
- `src/storage.js`
- `src/styles.css`
- `SPEC.md`
- `ARCHITECTURE.md`
- `AGENTS.md`

### Acceptance Criteria
- `index.html` exists and loads `src/styles.css` and `src/app.js`
- The page includes a title, short description, and a dedicated habit list container
- `src/app.js` initializes without runtime errors in a browser
- The UI shell contains stable hooks or IDs that later tickets can target
- Any temporary habit rendering is clearly isolated and easy to replace with the shared data model

### Manual Validation Steps
1. Open `index.html` in a browser
2. Confirm the page title and habit tracker heading are visible
3. Confirm a habit list region is present
4. Open the browser console and confirm there are no initialization errors

## Ticket 2: Habit data model

### Goal
Define the habit data structure, default habit list, and pure helper functions that the app can use without depending on DOM or storage code.

### Files Likely Touched
- `src/habits.js`

### Files Not To Touch
- `index.html`
- `src/app.js`
- `src/storage.js`
- `src/styles.css`
- `SPEC.md`
- `ARCHITECTURE.md`
- `AGENTS.md`

### Acceptance Criteria
- `src/habits.js` exports the default habit dataset or factory
- The module defines a stable shape for app state and each habit item
- The module exposes pure helpers for toggling or updating habit completion
- The module does not reference DOM APIs or `localStorage`
- The exported shape matches `ARCHITECTURE.md`

### Manual Validation Steps
1. Open `src/habits.js`
2. Confirm the default data includes the initial habit set from `SPEC.md`
3. Confirm helper functions return updated data without mutating inputs
4. Confirm the file does not import or access browser persistence APIs

## Ticket 3: localStorage persistence

### Goal
Implement browser persistence as a small standalone module that saves and loads habit tracker state without taking ownership of rendering or styling.

### Files Likely Touched
- `src/storage.js`

### Files Not To Touch
- `index.html`
- `src/app.js`
- `src/habits.js`
- `src/styles.css`
- `SPEC.md`
- `ARCHITECTURE.md`
- `AGENTS.md`

### Acceptance Criteria
- `src/storage.js` exports small functions for loading and saving app state
- The module uses a single documented `localStorage` key
- The module handles missing saved data gracefully
- The module handles malformed stored JSON without crashing the app
- The module does not render UI or define business rules already owned by `src/habits.js`

### Manual Validation Steps
1. Open `src/storage.js`
2. Confirm there is a clear `localStorage` key constant
3. Confirm load behavior returns a safe fallback for missing or invalid data
4. Confirm save behavior serializes the state shape described in `ARCHITECTURE.md`

## Ticket 4: Styling

### Goal
Add clean, lightweight styling for the existing app shell without changing data logic or persistence behavior.

### Files Likely Touched
- `src/styles.css`

### Files Not To Touch
- `index.html`
- `src/app.js`
- `src/habits.js`
- `src/storage.js`
- `SPEC.md`
- `ARCHITECTURE.md`
- `AGENTS.md`

### Acceptance Criteria
- `src/styles.css` provides a readable layout for mobile and desktop
- Core UI areas are visually separated and easy to scan
- Interactive controls have visible hover or focus states
- Styling relies on selectors already defined by the UI skeleton ticket
- No JavaScript changes are required to apply the styles

### Manual Validation Steps
1. Open the app in a browser
2. Confirm the page is readable at desktop width
3. Confirm the page remains usable at a narrow mobile width
4. Tab through interactive elements and confirm focus visibility

## Ticket 5: QA/manual testing

### Goal
Verify the tiny Habit Tracker manually against the spec and architecture docs, then capture defects or gaps without changing implementation files unless a separate bug ticket is approved.

### Files Likely Touched
- `TASK_BOARD.md`
- `AGENTS.md`

### Files Not To Touch
- `index.html`
- `src/app.js`
- `src/habits.js`
- `src/storage.js`
- `src/styles.css`
- `SPEC.md`
- `ARCHITECTURE.md`

### Acceptance Criteria
- A manual test checklist covers app load, habit toggle behavior, reload persistence, and basic responsive review
- Any discovered issues are recorded as follow-up items rather than mixed into QA notes
- QA confirms whether implementation matches `SPEC.md`
- QA confirms whether file ownership boundaries were respected

### Manual Validation Steps
1. Open the app in a browser
2. Toggle one or more habits
3. Refresh the page and confirm saved state is preserved
4. Check the browser console for errors
5. Review the implementation against `SPEC.md` and `ARCHITECTURE.md`
6. Record any defects as separate follow-up tasks

## Parallelization Notes
- Tickets 2, 3, 4, and 5 should avoid direct overlap by file ownership
- Ticket 1 owns the initial app shell and should land before final integration work
- Tickets 2 and 3 can proceed in parallel because they target separate modules with a predefined shared state shape
- Ticket 4 can proceed in parallel after the shell selectors are documented in Ticket 1
- Ticket 5 should run after implementation tickets have produced a reviewable app build
