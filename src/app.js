const temporaryHabits = [
  { id: "temp-drink-water", name: "Drink water", completed: false },
  { id: "temp-stretch", name: "Stretch", completed: false },
  { id: "temp-read", name: "Read 10 minutes", completed: false },
];

function renderTemporaryHabits(habits) {
  const habitList = document.querySelector("#habit-list");

  if (!habitList) {
    throw new Error("Missing #habit-list mount point.");
  }

  habitList.replaceChildren(
    ...habits.map((habit) => {
      const item = document.createElement("li");
      item.className = "habit-list-item";
      item.dataset.habitId = habit.id;

      const name = document.createElement("span");
      name.className = "habit-name";
      name.textContent = habit.name;

      const status = document.createElement("span");
      status.className = "habit-status";
      status.textContent = habit.completed ? "Complete" : "Not completed";

      item.append(name, status);
      return item;
    }),
  );
}

function initializeApp() {
  renderTemporaryHabits(temporaryHabits);
}

initializeApp();
