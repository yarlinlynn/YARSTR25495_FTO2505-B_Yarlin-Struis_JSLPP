// render.js
import { todoColumn, inProgressColumn, doneColumn, todoHeading, inProgressHeading, doneHeading } from "../script.js";
import { renderTaskModal } from "../tasks/taskModal.js";
import { tasks } from "../script";

let todoCount = 0;
let inProgressCount = 0;
let doneCount = 0;

/**
 * Clear all task columns and reset counts.
 */
export function clearTaskColumns() {
  todoColumn.innerHTML = "";
  inProgressColumn.innerHTML = "";
  doneColumn.innerHTML = "";
  todoCount = inProgressCount = doneCount = 0;
  todoHeading.textContent = `TODO (0)`;
  inProgressHeading.textContent = `IN PROGRESS (0)`;
  doneHeading.textContent = `DONE (0)`;
}

/**
 * Render a single task to the appropriate column.
 * @typedef {Object} Task
 */

export function renderTasksToTheDom(task) {
  const listElement = document.createElement("li");
  listElement.className =
    "task mb-[21px] bg-white h-[65px] pt-[20px] px-[19px] pb-[21px] rounded-lg text-[15px] font-bold leading-[100%] text-rich-black shadow-custom-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo dark:bg-dark-grey dark:text-white";
  listElement.setAttribute("tabindex", "0");
  listElement.textContent = task.title;

  listElement.addEventListener("click", () => renderTaskModal(task));

  if (task.status === "todo") {
    todoColumn.appendChild(listElement);
    todoCount++;
    todoHeading.textContent = `TODO (${todoCount})`;
  } else if (task.status === "doing") {
    inProgressColumn.appendChild(listElement);
    inProgressCount++;
    inProgressHeading.textContent = `IN PROGRESS (${inProgressCount})`;
  } else if (task.status === "done") {
    doneColumn.appendChild(listElement);
    doneCount++;
    doneHeading.textContent = `DONE (${doneCount})`;
  }
}

