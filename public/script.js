const todoTasksListEl = document.getElementById("todoTasksList");
const formEl = document.getElementById("addTaskForm");
const taskNameEl = document.getElementById("taskName");
const deleteBtnEl = document.querySelector(".deleteBtn");

const displayTasks = async () => {
  try {
    const { data: tasks } = await axios.get("/api/v1/tasks");

    if (tasks.length < 1) {
      todoTasksListEl.innerHTML = "<p>This is no task now.</p>";
      return;
    }

    const allTasks = tasks
      .map((task) => {
        const { completed, _id, name } = task;
        return `<div class="box is-flex is-justify-content-space-between">
        <h3 class="subtitle mb-0">${task.name}</h3>
        <div>
          <button
            ><span class="icon">
              <i class="fa solid fa-pen-to-square"></i> </span
          ></button>
          <button class="deleteBtn" data-id=${task._id}
            ><span class="icon"> <i class="fa solid fa-trash"></i> </span
          ></button>
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

todoTasksListEl.addEventListener("click", async (e) => {
  const element = e.target;
  console.log(element.parentElement.parentElement);
  const id = element.parentElement.parentElement.dataset.id;
  console.log(id);
  if (element.parentElement.parentElement.classList.contains("deleteBtn")) {
    console.log("Delete button clicked");
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      displayTasks();
    } catch (err) {
      console.log(err);
    }
  }
});
