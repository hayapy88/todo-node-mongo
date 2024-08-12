const todoTasksListEl = document.getElementById("todoTasksList");
const formEl = document.getElementById("addTaskForm");
const taskNameEl = document.getElementById("taskName");
const deleteBtnEl = document.querySelector(".deleteBtn");
const messageEl = document.getElementById("message");

const displayTasks = async () => {
  try {
    const { data: tasks } = await axios.get("/api/v1/tasks");

    if (tasks.length < 1) {
      todoTasksListEl.innerHTML = "<p>There are no tasks right now.</p>";
      return;
    }

    const allTasks = tasks
      .map((task) => {
        const { completed, _id, name } = task;
        return `<div class="box">
          <div class="columns is-mobile">
            <div class="column is-10">
              <h3 class="subtitle mb-0">${task.name}</h3>
            </div>
            <div class="column is-2 is-flex is-justify-content-flex-end">
              <button>
                <span class="icon">
                  <i class="fa solid fa-pen-to-square"></i>
                </span>
              </button>
              <button class="deleteBtn ml-1" data-id="${task._id}">
                <span class="icon">
                  <i class="fa solid fa-trash"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
        `;
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

  const showMessage = (message, type) => {
    messageEl.className = `is-block help mb-3 ${type}`;
    messageEl.innerHTML = message;
    setTimeout(() => {
      messageEl.innerHTML = "";
      messageEl.className = "is-hidden help mb-3";
    }, 3000);
  };

  if (!taskNameVal.length) {
    return showMessage("Task name is required.", "is-danger");
  } else if (taskNameVal.length > 50) {
    return showMessage("Task name must be 50 characters or less.", "is-danger");
  }

  try {
    await axios.post("/api/v1/tasks", { name: taskNameVal });
    displayTasks();
    taskNameEl.value = "";
    showMessage("The task was added successfully!", "is-success");
  } catch (err) {
    console.log(err);
    showMessage(
      "An error occurred on the server. Please try again later.",
      "is-danger"
    );
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
