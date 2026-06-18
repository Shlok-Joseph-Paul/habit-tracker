const DEFAULT_HABIT_DEFINITIONS = [
  { id: "drink-water", name: "Drink water" },
  { id: "stretch", name: "Stretch" },
  { id: "read-10-minutes", name: "Read 10 minutes" },
];

function createHabitId(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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

export function addHabit(state, name) {
  const normalizedName = name.trim();

  if (!normalizedName) {
    return state;
  }

  const baseId = createHabitId(normalizedName) || "habit";
  let nextId = baseId;
  let suffix = 2;

  while (state.habits.some((habit) => habit.id === nextId)) {
    nextId = `${baseId}-${suffix}`;
    suffix += 1;
  }

  return {
    ...state,
    habits: [
      ...state.habits,
      {
        id: nextId,
        name: normalizedName,
        completed: false,
      },
    ],
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
