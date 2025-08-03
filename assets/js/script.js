
import { initialTasks } from "../js/initialData.js";

// Get task column containers
const todoColumn = document.getElementById("todoColumn");
const inProgressColumn = document.getElementById("inProgressColumn");
const doneColumn = document.getElementById("doneColumn");

// Task heading elements
const todoHeading = document.getElementById("todo-heading");
const inProgressHeading = document.getElementById("doing-heading");
const doneHeading = document.getElementById("done-heading");

// Modal and form fields
const modal = document.getElementById("modalPopUp");
const titleInput = document.getElementById("titleInput");
const taskDescription = document.getElementById("taskDescription");
const statusSelect = document.getElementById("taskStatus");
const closeModalButton = document.getElementById("close-btn");

// Task counters
let todoCount = 0;
let inProgressCount = 0;
let doneCount = 0;

function openModalWithTask(task) {
  titleInput.value = task.title;
  taskDescription.value = task.description;
  statusSelect.value = task.status;
  modal.classList.remove("hidden");
}


function closeModal() {
  modal.classList.add("hidden");
}

// Event listener for closing modal
closeModalButton.addEventListener("click", closeModal);

// loop through each task and create il element for each
initialTasks.forEach((task) => {
  const listElement = document.createElement("li");
  listElement.className = "task mb-[21px] bg-white h-[60px] pt-[20px] px-[19px] pb-[21px] rounded-lg text-[15px] font-bold leading-[100%] text-rich-black shadow-custom-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo";
  listElement.setAttribute("tabindex", "0");
  listElement.textContent = task.title;

  // Show modal
  listElement.addEventListener("click", () => openModalWithTask(task));

  // check the status and put each in their respective columns
  if (task.status === "todo") {
    todoColumn.appendChild(listElement);
    todoCount++;
  } else if (task.status === "doing") {
    inProgressColumn.appendChild(listElement);
    inProgressCount++;
  } else if (task.status === "done") {
    doneColumn.appendChild(listElement);
    doneCount++;
  }
});

// Update headings with counts
todoHeading.textContent = `TODO (${todoCount})`;
inProgressHeading.textContent = `IN PROGRESS (${inProgressCount})`;
doneHeading.textContent = `DONE (${doneCount})`;
