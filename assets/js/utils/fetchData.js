import { renderDataToTheDom } from "../ui/renderTasks.js";

let tasks = []

export async function fetchData() {
  alert("Fetching data... please wait.");

  try {
    const response = await fetch("https://jsl-kanban-api.vercel.app/");
    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const apiData = await response.json(); // tasks from API

    // Get any locally saved tasks
    const localTasks = JSON.parse(localStorage.getItem("localTasks")) || [];

    // Merge API tasks with local tasks
    tasks = [...apiData, ...localTasks];

    // Save the merged tasks in localStorage
    localStorage.setItem("apiData", JSON.stringify(apiData)); // original API tasks
    localStorage.setItem("allTasks", JSON.stringify(tasks)); // all tasks including local

    // Render tasks to DOM
    tasks.forEach(task => renderDataToTheDom(task));

  } catch (error) {
    console.error(error);
    alert("Failed to fetch tasks from API.");
  }
}