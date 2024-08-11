const todoTasksListEl = document.getElementById("todoTasksList");
const formEl = document.getElementById("addTaskForm");
const taskNameEl = document.getElementById("taskName");

const displayTasks = async () => {
  try {
    const { data: tasks } = await axios.get("/api/v1/tasks");

    const allTasks = tasks
      .map((task) => {
        const { completed, _id, name } = task;
        return `<div class="box is-flex is-justify-content-space-between">
        <h3 class="subtitle mb-0">${task.name}</h3>
        <div>
          <a
            ><span class="icon">
              <i class="fa solid fa-pen-to-square"></i> </span
          ></a>
          <a
            ><span class="icon"> <i class="fa solid fa-trash"></i> </span
          ></a>
        </div>
      </div>`;
      })
      .join("");
    todoTasksListEl.innerHTML = allTasks;
  } catch (err) {
    console.log(err);
  }
};
displayTasks();

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const taskNameVal = taskNameEl.value;

  try {
    await axios.post("/api/v1/tasks", { name: taskNameVal });
    displayTasks();
    taskNameEl.value = "";
  } catch (err) {
    console.log(err);
  }
});
