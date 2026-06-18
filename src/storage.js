export const HABIT_TRACKER_STORAGE_KEY = "habit-tracker-state";

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

function isValidState(state) {
  return (
    typeof state === "object" &&
    state !== null &&
    typeof state.date === "string" &&
    Array.isArray(state.habits) &&
    state.habits.every(isValidHabit)
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
    return isValidState(parsedState) ? parsedState : null;
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
    storage.setItem(HABIT_TRACKER_STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}
