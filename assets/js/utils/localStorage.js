
import { tasks } from "../script";

export function saveTasksToLocalStorage(taskList) {
  localStorage.setItem("myKey", JSON.stringify(taskList));
}

export function loadTasksFromLocalStorage() {
  const savedTasks = JSON.parse(localStorage.getItem("myKey")) || [];
  if (savedTasks.length > 0) {
    tasks.length = 0;
    tasks.push(...savedTasks);
  }
}
