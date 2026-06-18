import {
  createDefaultState,
  getCurrentDateString,
  toggleHabitCompletion,
} from "./habits.js";
import { loadState, saveState } from "./storage.js";

let appState = createInitialState();

function createInitialState() {
  const savedState = loadState();
  const currentDate = getCurrentDateString();

  if (!savedState) {
    return createDefaultState(currentDate);
  }

  if (savedState.date !== currentDate) {
    return createDefaultState(currentDate);
  }

  return savedState;
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

function handleHabitToggle(event) {
  const target = event.target;

  if (!(target instanceof HTMLInputElement) || !target.matches(".habit-checkbox")) {
    return;
  }

  appState = toggleHabitCompletion(appState, target.dataset.habitId);
  saveState(appState);
  renderHabits(appState);
}

function initializeApp() {
  const habitList = document.querySelector("#habit-list");

  if (!habitList) {
    throw new Error("Missing #habit-list mount point.");
  }

  habitList.addEventListener("change", handleHabitToggle);

  saveState(appState);
  renderHabits(appState);
}

initializeApp();
