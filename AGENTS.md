# Orchestrator Guide

## Mission
Use this repo as an orchestrated workspace for a tiny Habit Tracker app. Optimize for small, parallel-safe tasks with clear ownership and low merge conflict risk.

## Current Phase
Planning only. Do not implement product features unless a ticket explicitly authorizes it in a future task.

## Source Of Truth
- Product requirements: `SPEC.md`
- Technical boundaries: `ARCHITECTURE.md`
- Work coordination: `TASK_BOARD.md`

## Repo Conventions
- Keep the app frontend-only
- Prefer small modules with one clear responsibility
- Match the state shape documented in `ARCHITECTURE.md`
- Do not introduce backend services, frameworks, or package tooling unless a future ticket requires them

## Parallel Work Rules
- Respect ticket file boundaries exactly
- If a ticket requires edits outside its allowed files, stop and create a dependency note instead of expanding scope
- Avoid touching shared planning docs unless the task is specifically about planning or QA notes
- Keep integration concerns out of leaf modules where possible

## Ticket Creation Standard
Each ticket must include:
- Goal
- Files likely touched
- Files not to touch
- Acceptance criteria
- Manual validation steps

## Initial Ticket Ownership
- UI skeleton: `index.html`, `src/app.js`
- Habit data model: `src/habits.js`
- localStorage persistence: `src/storage.js`
- Styling: `src/styles.css`
- QA/manual testing: documentation and validation only

## Coordination Notes For Future Codex Tasks
- Assume the repo may be partially complete when a ticket starts
- Read the relevant sections of `SPEC.md` and `ARCHITECTURE.md` before editing
- Preserve other tickets' file boundaries unless the orchestrator explicitly revises them
- If a conflict appears unavoidable, propose a new integration ticket instead of improvising

## Definition Of Done For This Planning Phase
- All four planning documents exist
- The app scope is documented
- The file layout is documented
- Five independent tickets are defined with conflict-minimized boundaries
