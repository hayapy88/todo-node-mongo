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
    const todoTasksListEl = document.getElementById("todoTasksList");
    todoTasksListEl.innerHTML = allTasks;
  } catch (err) {
    console.log(err);
  }
};
displayTasks();
