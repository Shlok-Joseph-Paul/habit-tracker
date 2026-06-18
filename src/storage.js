export const HABIT_TRACKER_STORAGE_KEY = "habit-tracker-state";
export const HABIT_TRACKER_STORAGE_SCHEMA_VERSION = 2;

function getStorage() {
  if (typeof globalThis === "undefined" || !globalThis.localStorage) {
    return null;
  }

  return globalThis.localStorage;
}

function isValidHabit(habit) {
  return (
    typeof habit === "object" &&
    habit !== null &&
    typeof habit.id === "string" &&
    typeof habit.name === "string" &&
    typeof habit.completed === "boolean"
  );
}

function isValidHistory(history) {
  return (
    typeof history === "object" &&
    history !== null &&
    Object.entries(history).every(([date, completedCount]) => {
      return (
        typeof date === "string" &&
        Number.isInteger(completedCount) &&
        completedCount >= 0
      );
    })
  );
}

function isValidState(state) {
  return (
    typeof state === "object" &&
    state !== null &&
    typeof state.date === "string" &&
    Array.isArray(state.habits) &&
    state.habits.every(isValidHabit) &&
    (state.history === undefined || isValidHistory(state.history))
  );
}

function normalizeState(state) {
  return {
    ...state,
    history: isValidHistory(state.history) ? state.history : {},
  };
}

function isValidPersistedPayload(payload) {
  return (
    typeof payload === "object" &&
    payload !== null &&
    payload.version === HABIT_TRACKER_STORAGE_SCHEMA_VERSION &&
    isValidState(payload.state)
  );
}

export function loadState() {
  const storage = getStorage();

  if (!storage) {
    return null;
  }

  try {
    const rawState = storage.getItem(HABIT_TRACKER_STORAGE_KEY);

    if (!rawState) {
      return null;
    }

    const parsedState = JSON.parse(rawState);

    if (isValidPersistedPayload(parsedState)) {
      return normalizeState(parsedState.state);
    }

    // Fall back to the legacy unversioned shape so older local saves do not crash
    // the app while the storage schema grows to include day-by-day history.
    if (isValidState(parsedState)) {
      return normalizeState(parsedState);
    }

    return null;
  } catch {
    return null;
  }
}

export function saveState(state) {
  const storage = getStorage();

  if (!storage || !isValidState(state)) {
    return false;
  }

  try {
    storage.setItem(
      HABIT_TRACKER_STORAGE_KEY,
      JSON.stringify({
        version: HABIT_TRACKER_STORAGE_SCHEMA_VERSION,
        state: normalizeState(state),
      }),
    );
    return true;
  } catch {
    return false;
  }
}
