const DEFAULT_HABIT_DEFINITIONS = [
  { id: "drink-water", name: "Drink water" },
  { id: "stretch", name: "Stretch" },
  { id: "read-10-minutes", name: "Read 10 minutes" },
];

export function getCurrentDateString() {
  return new Date().toISOString().slice(0, 10);
}

export function createDefaultHabits() {
  return DEFAULT_HABIT_DEFINITIONS.map((habit) => ({
    ...habit,
    completed: false,
  }));
}

export function createDefaultState(date = getCurrentDateString()) {
  return {
    date,
    habits: createDefaultHabits(),
  };
}

export function setHabitCompletion(state, habitId, completed) {
  return {
    ...state,
    habits: state.habits.map((habit) =>
      habit.id === habitId ? { ...habit, completed } : habit,
    ),
  };
}

export function toggleHabitCompletion(state, habitId) {
  return {
    ...state,
    habits: state.habits.map((habit) =>
      habit.id === habitId
        ? { ...habit, completed: !habit.completed }
        : habit,
    ),
  };
}
