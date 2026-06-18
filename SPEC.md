# Habit Tracker Spec

## Purpose
Build a tiny single-page Habit Tracker app for tracking a small list of habits and whether each habit is completed for the current day.

## Target User
A single local user running the app in a browser on one device.

## Product Scope
- Display a page title and a short description of the app
- Show a list of habits
- Allow each habit to be marked complete or incomplete for today
- Show simple per-habit status for the current day
- Persist habit state in the browser with `localStorage`
- Load persisted state when the page is reopened

## Non-Goals
- Authentication
- Accounts or cloud sync
- Backend or API
- Multi-user support
- Advanced analytics
- Notifications
- Habit creation or deletion in v1 unless a later ticket explicitly adds it

## Functional Requirements
1. The app renders a visible shell with a header, main content area, and habit list region.
2. The app starts with a small default habit list if no saved data exists.
3. Each habit has a stable identifier, display name, and completion state for the current day.
4. The user can toggle a habit between complete and incomplete.
5. The app saves habit data after each state change.
6. On reload, the app restores the most recently saved habit state.

## Suggested Initial Habit Set
- Drink water
- Stretch
- Read 10 minutes

## UX Constraints
- Keep the interface simple and readable on desktop and mobile
- Prefer plain controls with clear labels
- Do not require modal flows or hidden interactions

## Technical Constraints
- Frontend-only implementation
- Browser `localStorage` is the only persistence layer
- Keep implementation small and easy to reason about

## Success Criteria
- A user can open the page, toggle habits, refresh the browser, and see the same state preserved
- The codebase remains easy to split into independent follow-up tasks
