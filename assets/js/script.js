
import { saveTasksToLocalStorage, loadTasksFromLocalStorage } from "./utils/localStorage.js";
import { renderTasksToTheDom, clearTaskColumns } from "./ui/renderTasks.js";
import { newTaskModal } from "./tasks/newTaskModal.js";
import { mobileNav } from "./ui/mobileNav.js";
import { sidebarToggle } from "./utils/sidebarToggle.js";
import { setupThemeToggle } from "./utils/toggleTheme.js";

// Shared in-memory task array
export let tasks = [];

// Shared DOM elements
export const todoColumn = document.getElementById("todoColumn");
export const inProgressColumn = document.getElementById("inProgressColumn");
export const doneColumn = document.getElementById("doneColumn");

export const todoHeading = document.getElementById("todo-heading");
export const inProgressHeading = document.getElementById("doing-heading");
export const doneHeading = document.getElementById("done-heading");

// Fetch tasks from API
async function fetchTasks() {
  clearTaskColumns();
  // add loading element while data is being fetched
  
  try {
    const response = await fetch("https://jsl-kanban-api.vercel.app/");
    if (!response.ok) throw new Error(`HTTP error: ${res.status}`);

    const data = await res.json();
    tasks = [...data];
    console.log(data)

    saveTasksToLocalStorage(tasks);

    clearTaskColumns();
    tasks.forEach(renderTasksToTheDom);

  } catch (err) {
    console.error(err);
  }
}

function taskboardApp() {
  setupThemeToggle();
  loadTasksFromLocalStorage();
  tasks.forEach(renderTasksToTheDom);

  newTaskModal();
  mobileNav();
  sidebarToggle();

  fetchTasks();
}

document.addEventListener("DOMContentLoaded", taskboardApp);
