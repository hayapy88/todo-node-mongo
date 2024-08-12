const todoTasksListEl = document.getElementById("todoTasksList");
const formEl = document.getElementById("addTaskForm");
const taskNameEl = document.getElementById("taskName");
const messageEl = document.getElementById("message");
const editTaskModalEl = document.getElementById("editTaskModal");

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
            <div class="column is-10" style="position: relative">
              ${
                completed
                  ? '<i class="fa-solid fa-circle-check has-text-success" style="position: absolute;left: -4px;top: 50%;transform: translateY(-50%);font-size: 13px;"></i>'
                  : ""
              }
              <h3 class="subtitle is-5 mb-0" style="${
                completed && "text-decoration: line-through"
              }">${name}</h3>
            </div>
            <div class="column is-2 is-flex is-justify-content-flex-end">
              <button class="editModalBtn modal-button js-modal-trigger" data-id="${_id}" data-target="editTaskModal">
                <span class="icon">
                  <i class="fa solid fa-pen-to-square has-text-success"></i>
                </span>
              </button>
              <button class="deleteBtn ml-1" data-id="${_id}">
                <span class="icon">
                  <i class="fa solid fa-trash has-text-danger"></i>
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
  const showMessage = (message, type) => {
    messageEl.className = `is-block help mb-3 ${type}`;
    messageEl.textContent = message;
    setTimeout(() => {
      messageEl.textContent = "";
      messageEl.className = "is-hidden help mb-3";
    }, 3000);
  };
  e.preventDefault();
  const taskNameVal = taskNameEl.value;

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

const putEditTask = async (taskId) => {
  const modalContentEl = document.querySelector(".modal-content");

  try {
    const { data: task } = await axios.get(`/api/v1/tasks/${taskId}`);
    console.log(task);
    const { completed, _id, name } = task;
    const status = task.completed ? "checked" : "";
    modalContentEl.innerHTML = `<div class="box">
        <p class="title is-4">Edit the Task</p>
        <form id="editTaskForm">
          <div class="columns is-mobile">
            <div class="column is-3">ID</div>
            <p id="editTaskId" class="column is-9">${_id}</p>
          </div>
          <div class="columns is-mobile">
            <div
              class="column is-3 is-flex is-align-items-center"
              style="line-height: 1.2"
            >
              Task Name
            </div>
            <div class="column is-9 control">
              <input
                type="text"
                id ="editTaskName"
                class="input"
                value="${name}"
              />
            </div>
          </div>
          <div>
            <label class="checkbox">
              <input type="checkbox" id="editTaskCompleted" ${status} />
              Completed
            </label>
          </div>

          <button type="submit" class="button is-primary mt-5">Save change</button>
          <p id="editMessage" class="is-hidden help mb-3"></p>
        </form>
        <!-- Your content -->
      </div>
    `;
    document
      .getElementById("editTaskForm")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const editMessageEl = document.getElementById("editMessage");
        const showEditMessage = (message, type, close = false) => {
          editMessageEl.className = `is-block help ${type}`;
          editMessageEl.textContent = message;
          setTimeout(() => {
            editMessageEl.textContent = "";
            editMessageEl.className = "is-hidden help";
            if (close) {
              editTaskModalEl.classList.remove("is-active");
            }
          }, 3000);
        };

        const editTaskIdVal = document.getElementById("editTaskId").innerText;
        console.log(editTaskIdVal);
        const editTaskNameVal = document.getElementById("editTaskName").value;
        console.log(editTaskNameVal);
        const editTaskCompletedBool =
          document.getElementById("editTaskCompleted").checked;
        console.log(editTaskCompletedBool);

        if (!editTaskNameVal.length) {
          return showEditMessage("Task name is required.", "is-danger");
        } else if (editTaskNameVal.length > 50) {
          return showEditMessage(
            "Task name must be 50 characters or less.",
            "is-danger"
          );
        }

        try {
          await axios.patch(`/api/v1/tasks/${editTaskIdVal}`, {
            name: editTaskNameVal,
            completed: editTaskCompletedBool,
          });
          displayTasks();
          showEditMessage(
            "The task was edited successfully!",
            "is-success",
            true
          );
        } catch (err) {
          console.log(err);
          showEditMessage(
            "An error occurred on the server. Please try again later.",
            "is-danger"
          );
        }
      });
  } catch (err) {
    console.log(err);
  }
};

todoTasksListEl.addEventListener("click", async (e) => {
  const element = e.target;
  const editModalBtnEl = element.closest(".editModalBtn");
  const deleteBtnEl = element.closest(".deleteBtn");

  function openModal($el) {
    $el.classList.add("is-active");
  }

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      console.log("clicked");

      openModal($target);
    });
  });

  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });

  if (editModalBtnEl) {
    const taskId = editModalBtnEl.dataset.id;
    const modalId = editModalBtnEl.dataset.target;
    const modal = document.getElementById(modalId);
    openModal(modal);
    putEditTask(taskId);
  }

  if (deleteBtnEl) {
    const id = deleteBtnEl.dataset.id;
    console.log("Delete button clicked", id);

    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      displayTasks();
    } catch (err) {
      console.log(err);
    }
  }
});
