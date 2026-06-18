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

## Completion Notes

### Ticket 1: UI skeleton
- Status: Complete
- Implemented `index.html` with the required page shell, title, description, and stable habit list hooks
- Implemented `src/app.js` as the browser entry point with isolated temporary habit rendering
- Left data model, persistence, and styling work for Tickets 2, 3, and 4 respectively

### Ticket 1: Validation Steps Run
1. Open `index.html` in a browser
2. Confirm the document title is `Habit Tracker`
3. Confirm the heading, description, and habit list region render
4. Confirm three temporary habit items appear without console initialization errors

### Ticket 2: Habit data model
- Status: Complete
- Implemented `src/habits.js` with the default state factory and pure completion update helpers
- Added the initial habit set from `SPEC.md` using stable habit identifiers
- Kept the module independent from DOM APIs and browser persistence

### Ticket 2: Validation Steps Run
1. Open `src/habits.js`
2. Confirm the exported default state uses `date` plus a `habits` array
3. Confirm the default habits are `Drink water`, `Stretch`, and `Read 10 minutes`
4. Confirm `setHabitCompletion` and `toggleHabitCompletion` return copied state instead of mutating inputs

### Ticket 3: localStorage persistence
- Status: Complete
- Implemented `src/storage.js` with a single `localStorage` key plus standalone load and save helpers
- Added defensive handling for missing storage access, missing saved data, malformed JSON, and invalid persisted shapes
- Kept persistence concerns isolated from DOM rendering and habit business logic

### Ticket 3: Validation Steps Run
1. Open `src/storage.js`
2. Confirm `HABIT_TRACKER_STORAGE_KEY` is defined once and used by both exported helpers
3. Confirm `loadState()` returns `null` when storage is unavailable, data is missing, JSON is malformed, or the saved shape is invalid
4. Confirm `saveState()` serializes only valid state objects and returns `false` when persistence is unavailable or fails

## Integration Notes

### What Was Integrated
- Wired `src/app.js` to load initial state from `src/storage.js`
- Wired `src/app.js` to fall back to the default state factory in `src/habits.js` when no saved state exists
- Replaced the temporary habit list rendering in `src/app.js` with interactive checkbox-based rendering backed by the shared state shape
- Wired habit toggle events to `toggleHabitCompletion()` and persisted each change through `saveState()`

### What Was Fixed
- Removed the temporary in-file habit dataset from `src/app.js` so the app now uses the shared habit model module end-to-end
- Fixed the missing integration between UI events and persistence, so habit completion now survives a browser reload
- Fixed the shell copy in `index.html` so it no longer claims the app is still using temporary rendering
- Added date-aware initialization in `src/app.js` so a stale saved state does not carry yesterday's completion flags into a new day

### Remaining Issues
- `src/styles.css` is still missing, and the app currently requests that file with a `404` at runtime
- Ticket 4 styling work is still not started, so the app is functional but visually unstyled
- QA/manual testing documentation from Ticket 5 is still not recorded as a standalone verification pass

### Next Recommended Tickets
- Ticket 4: Styling
- Ticket 5: QA/manual testing
- Follow-up bug ticket if desired: decide whether the integration agent should add an empty placeholder `src/styles.css` before styling begins, or leave the current `404` in place until Ticket 4 owns the file

### Integration Validation Run
1. Served the app locally and opened `index.html` in a browser
2. Confirmed the page rendered three default habits from the shared habit model
3. Toggled a habit and confirmed the visible status changed from `Not completed` to `Complete`
4. Reloaded the page and confirmed the toggled habit remained completed
5. Confirmed the browser requested `src/styles.css` and the local server returned `404`
