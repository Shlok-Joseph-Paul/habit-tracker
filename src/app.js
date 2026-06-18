import {
  createDefaultState,
  getCurrentDateString,
  toggleHabitCompletion,
} from "./habits.js";
import { getCompletedHabitCount, getTotalHabitCount } from "./progress.js";
import { loadState, saveState } from "./storage.js";

let appState = createInitialState();

function createInitialState() {
  const savedState = loadState();
  const currentDate = getCurrentDateString();

  if (!savedState) {
    return withCurrentDayHistory(createDefaultState(currentDate));
  }

  if (savedState.date !== currentDate) {
    return withCurrentDayHistory({
      ...createDefaultState(currentDate),
      history: getHistory(savedState),
    });
  }

  return withCurrentDayHistory(savedState);
}

function getHistory(state) {
  if (typeof state?.history !== "object" || state.history === null) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(state.history).filter((entry) => {
      const [date, count] = entry;
      return typeof date === "string" && Number.isFinite(count);
    }),
  );
}

function withCurrentDayHistory(state) {
  const currentDate = state.date ?? getCurrentDateString();

  return {
    ...state,
    history: {
      ...getHistory(state),
      [currentDate]: getCompletedHabitCount(state),
    },
  };
}

function renderHabits(state) {
  const habitList = document.querySelector("#habit-list");

  if (!habitList) {
    throw new Error("Missing #habit-list mount point.");
  }

  habitList.replaceChildren(
    ...state.habits.map((habit) => {
      const item = document.createElement("li");
      item.className = "habit-list-item";
      item.dataset.habitId = habit.id;

      const label = document.createElement("label");
      label.className = "habit-toggle";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "habit-checkbox";
      checkbox.dataset.habitId = habit.id;
      checkbox.checked = habit.completed;

      const name = document.createElement("span");
      name.className = "habit-name";
      name.textContent = habit.name;

      const status = document.createElement("span");
      status.className = "habit-status";
      status.textContent = habit.completed ? "Complete" : "Not completed";

      label.append(checkbox, name);
      item.append(label, status);
      return item;
    }),
  );
}

function renderCompletionHistory(state) {
  const historyGraph = document.querySelector("#completion-history-graph");

  if (!historyGraph) {
    throw new Error("Missing #completion-history-graph mount point.");
  }

  const totalHabitCount = Math.max(getTotalHabitCount(state), 1);
  const historyEntries = Object.entries(getHistory(state)).sort((left, right) =>
    left[0].localeCompare(right[0]),
  );

  historyGraph.replaceChildren(
    ...historyEntries.map(([date, completedCount]) => {
      const item = document.createElement("li");
      item.className = "completion-history-item";
      item.dataset.historyDate = date;

      const label = document.createElement("span");
      label.className = "completion-history-date";
      label.textContent = date;

      const barTrack = document.createElement("div");
      barTrack.className = "completion-history-bar-track";

      const barFill = document.createElement("span");
      barFill.className = "completion-history-bar-fill";
      barFill.style.setProperty(
        "--completion-ratio",
        String(completedCount / totalHabitCount),
      );

      barTrack.append(barFill);

      const value = document.createElement("span");
      value.className = "completion-history-value";
      value.textContent = `${completedCount}/${getTotalHabitCount(state)}`;

      item.append(label, barTrack, value);
      return item;
    }),
  );
}

function handleHabitToggle(event) {
  const target = event.target;

  if (!(target instanceof HTMLInputElement) || !target.matches(".habit-checkbox")) {
    return;
  }

  appState = withCurrentDayHistory(
    toggleHabitCompletion(appState, target.dataset.habitId),
  );
  saveState(appState);
  renderHabits(appState);
  renderCompletionHistory(appState);
}

function initializeApp() {
  const habitList = document.querySelector("#habit-list");

  if (!habitList) {
    throw new Error("Missing #habit-list mount point.");
  }

  habitList.addEventListener("change", handleHabitToggle);

  saveState(appState);
  renderHabits(appState);
  renderCompletionHistory(appState);
}

initializeApp();
