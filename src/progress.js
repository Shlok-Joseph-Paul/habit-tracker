function getHabits(state) {
  return Array.isArray(state?.habits) ? state.habits : [];
}

export function getTotalHabitCount(state) {
  return getHabits(state).length;
}

export function getCompletedHabitCount(state) {
  return getHabits(state).filter((habit) => habit.completed === true).length;
}

export function getHabitCompletionPercentage(state) {
  const totalHabitCount = getTotalHabitCount(state);

  if (totalHabitCount === 0) {
    return 0;
  }

  return Math.round(
    (getCompletedHabitCount(state) / totalHabitCount) * 100,
  );
}

export function getHabitProgressSummary(state) {
  const totalHabitCount = getTotalHabitCount(state);
  const completedHabitCount = getCompletedHabitCount(state);

  return {
    completedHabitCount,
    totalHabitCount,
    completionPercentage:
      totalHabitCount === 0
        ? 0
        : Math.round((completedHabitCount / totalHabitCount) * 100),
  };
}
