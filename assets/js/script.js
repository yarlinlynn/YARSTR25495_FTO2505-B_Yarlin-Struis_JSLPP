import { initialTasks } from "../js/initialData.js"

// Create variables of task column
const todoColumn = document.getElementById("todoColumn");
const inProgressColumn = document.getElementById("inProgressColumn");
const doneColumn = document.getElementById("doneColumn");

// Get the task heading for each task column
const todoHeading = document.getElementById("todo-heading");
const inProgressHeading = document.getElementById("doing-heading");
const doneHeading = document.getElementById("done-heading");

// Get the count of each task in column
let todoCount = 0;
let inProgressCount = 0;
let doneCount = 0;

// loop through each task and create il element for each
initialTasks.forEach(task => {
  const listElement = document.createElement("li");
  listElement.classList.add("task")

  listElement.setAttribute("tabindex", "0");
  listElement.className = "task mb-[21px] bg-white h-[60px] pt-[20px] px-[19px] pb-[21px] rounded-lg text-[15px] font-bold leading-[100%] text-rich-black shadow-custom-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo";
  listElement.textContent = task.title;

  // check the status and put each in their respective columns
  if (task.status === "todo") {
    todoColumn.appendChild(listElement);
    todoCount++
  } else if (task.status === "doing") {
    inProgressColumn.appendChild(listElement);
    inProgressCount++
  } else if (task.status === "done") {
    doneColumn.appendChild(listElement);
    doneCount++
  }

})

// Update heading counters
todoHeading.textContent = `TODO (${todoCount})`;
inProgressHeading.textContent = `IN PROGRESS (${inProgressCount})`;
doneHeading.textContent = `DONE (${doneCount})`;