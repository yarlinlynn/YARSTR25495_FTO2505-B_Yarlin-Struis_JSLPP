
// import { fetchData } from "./utils/fetchData.js";
// import { renderTasksToTheDom,  } from "./ui/renderTasks.js";
// import { newTaskModal } from "./tasks/newTaskModal.js";
// import { mobileNav } from "./ui/mobileNav.js";
// import { sidebarToggle } from "./utils/sidebarToggle.js";
// import { setupThemeToggle } from "./utils/toggleTheme.js";

/**
 * GET DOM ELEMENTS
 * @type {HTMLElement}
*/

// Get task column containers

const todoColumn = document.getElementById("todoColumn");
const inProgressColumn = document.getElementById("inProgressColumn");
const doneColumn = document.getElementById("doneColumn");

// Task heading elements

const todoHeading = document.getElementById("todo-heading");
const inProgressHeading = document.getElementById("doing-heading");
const doneHeading = document.getElementById("done-heading");

// Hide & show elements

const sidebar = document.querySelector(".sidebar");
const showSidebarBtn = document.getElementById("showSidebarBtn");
const hideSidebarBtn = document.getElementById("hideSidebarBtn");

// Count of tasks in each column

let todoCount = 0;
let inProgressCount = 0;
let doneCount = 0;


let tasks = []

/**
 * Delay execution for a given number of milliseconds.
 * 
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise<void>} A promise that resolves after the given delay.
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Show the loading message by removing the "hidden" class
 * from the loading element in the DOM.
 * 
 * @returns {void}
 */
function showLoading() {
  document.getElementById('loading').classList.remove("hidden");
}

/**
 * Hide the loading message by adding the "hidden" class
 * to the loading element in the DOM.
 * 
 * @returns {void}
 */
function hideLoading() {
  document.getElementById('loading').classList.add("hidden");
}

/**
 * Fetch tasks from an external API and merge them with locally saved tasks.
 * 
 * - Shows a loading message while fetching.
 * - Waits 2 seconds before making the request.
 * - Merges API tasks with tasks from localStorage (avoiding duplicates by id).
 * - Saves the merged list back to localStorage.
 * - Renders each task to the DOM using `renderDataToTheDom()`.
 * - On failure, shows a custom error message in place of the loading spinner.
 * 
 * @async
 * @function fetchData
 * @returns {Promise} Resolves when tasks are fetched, merged, and rendered.
 */
fetchData();

async function fetchData() {
  // show loading message while data is being fetched from api
  // alert("Fetching data... please wait.");
  showLoading(); // show loading animation
  await delay(2000); // wait for 2 seconds before fetching

  try {
    const response = await fetch("https://jsl-kanban-api.vercel.app/");
    if (!response.ok) throw new Error("Could not fetch resource");

    const apiData = await response.json();

    // Get tasks saved in localStorage
    const localTasks = JSON.parse(localStorage.getItem("allTasks")) || [];

    // Merge API tasks with local tasks, avoiding duplicates by id
    tasks = [
      ...apiData,
      ...localTasks.filter(t => !apiData.some(a => a.id === t.id))
    ];

    // Save merged tasks back to localStorage
    localStorage.setItem("allTasks", JSON.stringify(tasks));

    // Render each task only once
    tasks.forEach(task => renderDataToTheDom(task));

  } catch (error) {
    console.error(error);
    // alert("Failed to fetch tasks from API.");
    // Create custom error message
    const loadingContainer = document.getElementById("loading");
    if (loadingContainer) {
      loadingContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center bg-white dark:bg-dark-grey p-6 rounded-lg shadow-lg w-72 sm:w-80 md:w-96 text-center">
          <p class="text-red-500 dark:text-red-400 text-base sm:text-lg font-semibold">
            Failed to fetch tasks from API.
          </p>
        </div>
      `;
    }
  } finally {
    hideLoading(); // hide loading animation after fetch
  }
}

/**
 * Render tasks to the DOM
 * @typedef {Object} Task
 * @param {Task} task - The task object to display
*/
// function renderDataToTheDom(task) {
//   const listElement = document.createElement("li");
//   listElement.className =
//     "task mb-[21px] bg-white h-[65px] pt-[20px] px-[19px] pb-[21px] rounded-lg text-[15px] font-bold leading-[100%] text-rich-black shadow-custom-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo dark:bg-dark-grey dark:text-white";
//   listElement.setAttribute("tabindex", "0");
//   listElement.textContent = task.title;

//   // to ensure i can find the li id if user wants to delete the task from the dom
//   listElement.setAttribute("data-id", task.id.toString());

//   listElement.addEventListener("click", () => renderTaskModal(task));

//   if (task.status === "todo") {
//     todoColumn.appendChild(listElement);
//     todoCount++;
//     todoHeading.textContent = `TODO (${todoCount})`;
//   } else if (task.status === "doing") {
//     inProgressColumn.appendChild(listElement);
//     inProgressCount++;
//     inProgressHeading.textContent = `IN PROGRESS (${inProgressCount})`;
//   } else if (task.status === "done") {
//     doneColumn.appendChild(listElement);
//     doneCount++;
//     doneHeading.textContent = `DONE (${doneCount})`;
//   }
// }

/**
 * Render a single task to the DOM inside the correct column.
 * - Creates a list item with styling and priority indicator.
 * - Adds event listener to open a modal when clicked.
 * - Updates column counts.
 * - Sorts tasks in the column by priority (high → low).
 *
 * @param {Object} task - The task object to render.
 * @param {number} task.id - Unique ID of the task.
 * @param {string} task.title - Title of the task.
 * @param {string} task.description - Description of the task.
 * @param {"todo"|"doing"|"done"} task.status - Current task status.
 * @param {"low"|"medium"|"high"} task.priority - Priority level of the task.
 */
// function renderDataToTheDom(task) {
//   const listElement = document.createElement("li");
//   listElement.className =
//     "task mb-[21px] bg-white h-[65px] pt-[20px] px-[19px] pb-[21px] rounded-lg text-[15px] font-bold leading-[100%] text-rich-black shadow-custom-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo dark:bg-dark-grey dark:text-white after:content-[''] after:inline-block after:w-3 after:h-3 after:rounded-full after:ml-3";

//   // Set the priority color using after:
//   if (task.priority === "low") listElement.classList.add("after:bg-green-500");
//   else if (task.priority === "medium") listElement.classList.add("after:bg-orange-500");
//   else if (task.priority === "high") listElement.classList.add("after:bg-red-500");

//   listElement.setAttribute("tabindex", "0");
//   listElement.textContent = task.title;
//   listElement.setAttribute("data-id", task.id.toString());

//   listElement.addEventListener("click", () => renderTaskModal(task));

//   // Append to the correct column and update count
//   if (task.status === "todo") {
//     todoColumn.appendChild(listElement);
//     todoCount++;
//     todoHeading.textContent = `TODO (${todoCount})`;
//   } else if (task.status === "doing") {
//     inProgressColumn.appendChild(listElement);
//     inProgressCount++;
//     inProgressHeading.textContent = `IN PROGRESS (${inProgressCount})`;
//   } else if (task.status === "done") {
//     doneColumn.appendChild(listElement);
//     doneCount++;
//     doneHeading.textContent = `DONE (${doneCount})`;
//   }

//   // Now sort the column by priority so highest priority is first
//   const priorityOrder = { high: 1, medium: 2, low: 3 };
//   const column = task.status === "todo" ? todoColumn : task.status === "doing" ? inProgressColumn : doneColumn;

//   // Convert children to array and sort by priority
//   Array.from(column.children)
//     .sort((a, b) => {
//       const aTask = tasks.find(t => t.id == a.dataset.id);
//       const bTask = tasks.find(t => t.id == b.dataset.id);
//       const aPriority = aTask.priority ? priorityOrder[aTask.priority] : Infinity;
//       const bPriority = bTask.priority ? priorityOrder[bTask.priority] : Infinity;
//       return aPriority - bPriority;
//     })
//     .forEach(el => column.appendChild(el)); // re-append in order
// }

function renderDataToTheDom(task) {
  const listElement = document.createElement("li");
  listElement.className =
    "task mb-[21px] bg-white h-[65px] flex gap-1 items-center justify-between px-[19px] rounded-lg text-[15px] font-bold leading-[100%] text-rich-black shadow-custom-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo dark:bg-dark-grey dark:text-white";

  listElement.setAttribute("tabindex", "0");
  listElement.setAttribute("data-id", task.id.toString());

  // Title text
  const title = document.createElement("span");
  title.textContent = task.title;

  // Priority dot (using emoji instead of a styled span)
  const dot = document.createElement("span");
  dot.className = "ml-3";
  if (task.priority === "low") dot.textContent = "🟢";
  else if (task.priority === "medium") dot.textContent = "🟠";
  else if (task.priority === "high") dot.textContent = "🔴";

  // Add click to open modal
  listElement.addEventListener("click", () => renderTaskModal(task));

  // Put text and dot inside the li
  listElement.appendChild(title);
  listElement.appendChild(dot);

  // Append to the correct column and update count
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

  // Sort the column by priority
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  const column =
    task.status === "todo"
      ? todoColumn
      : task.status === "doing"
      ? inProgressColumn
      : doneColumn;

  Array.from(column.children)
    .sort((a, b) => {
      const aTask = tasks.find(t => t.id == a.dataset.id);
      const bTask = tasks.find(t => t.id == b.dataset.id);
      const aPriority = aTask.priority ? priorityOrder[aTask.priority] : Infinity;
      const bPriority = bTask.priority ? priorityOrder[bTask.priority] : Infinity;
      return aPriority - bPriority;
    })
    .forEach(el => column.appendChild(el)); // re-append in sorted order
}


/**
 * Render a modal for viewing and editing a specific task.
 * - Displays task details in a form.
 * - Allows editing or deleting the task.
 * - Closes when the backdrop or close button is clicked.
 *
 * @param {Object} task - The task object to render in the modal.
 * @param {number} task.id - Unique ID of the task.
 * @param {string} task.title - Title of the task.
 * @param {string} task.description - Description of the task.
 * @param {"todo"|"doing"|"done"} task.status - Current task status.
 * @param {"low"|"medium"|"high"} task.priority - Priority level of the task.
 */

function renderTaskModal(task) {
  const modalWrapper = document.createElement("section");
  modalWrapper.classList.add("fixed", "top-0", "left-0", "w-full", "h-full", "z-50");
  modalWrapper.setAttribute("data-task-id", task.id);
  modalWrapper.innerHTML = `
    <!-- Backdrop -->
      <div class="bg-black opacity-50 fixed top-0 left-0 w-full h-[130vh]"></div>

      <!-- Form Container -->
      <div id="formContainer" class="bg-white dark:bg-dark-grey absolute top-[64px] lg:top-[240px] left-0 right-0 m-auto w-[343px] md:w-[600px] p-[24px] rounded-[6px] h-[600px] md:h-[560px] flex flex-col g-[24px]">

        <div class="flex items-center justify-between pb-4">
          <h2 class="text-[18px] dark:text-white font-bold leading-100%">Task</h2>
                  
          <img src="./assets/images/Group 45.svg" id="closeModalBtn" alt="close button">
        </div>

        <!-- Form Container -->
         <form>
            <!-- Task Title -->
            <label for="title" class="text-[12px] font-bold text-medium-grey">Title</label>
            <input id="title" name="title" type="text" placeholder="e.g. Take chilled break" class="relative dark:text-black font-body border border-gray-300 rounded h-[40px] w-full pt-[8px] pb-[9px] pl-[18px] mb-[24px] mt-[8px] text-[13px]"/>

            <!-- Task Description -->
            <label for="description" class="text-[12px] font-bold text-medium-grey">Description</label>
            <textarea id="description" name="description" 
              class="h-[112px] text-[13px] border border-gray-300 rounded w-full pt-[8px] pb-[9px] pl-[18px] pr-[18px] mb-[24px] mt-[8px] dark:text-black"></textarea>

            <!-- Task Status -->
            <label for="taskStatus" class="mb-[8px] text-[12px] font-bold text-medium-grey">Status</label>
            <div class="w-full border rounded flex items-center justify-between mb-[24px] mt-[8px]">
              <select id="taskStatus" class="appearance-none font-body w-full text-[13px] pt-[8px] pb-[8px] pl-[18px] leading-[23px] pr-4 bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2211%22%20height=%228%22%20viewBox=%220%200%2011%208%22%20fill=%22none%22><path%20d=%22M0.79834%201.54863L5.49682%206.24711L10.1953%201.54863%22%20stroke=%22%23828FA3%22%20stroke-width=%222%22/></svg>')] bg-no-repeat bg-[length:0.8rem] bg-[right_0.75rem_center]
             rounded px-3 py-2 dark:text-black">
                <option value="todo">todo</option>
                <option value="doing">in progress</option>
                <option value="done">done</option>
              </select>
            </div>

            <!-- Task Priority -->
            <label for="taskPriority" class="mb-[8px] text-[12px] font-bold text-medium-grey">Priority</label>
            <div class="w-full border border-gray-300 rounded flex items-center justify-between mb-[24px] mt-[8px]">
              <select id="taskPriority" class="appearance-none font-body text-[13px] w-full pt-[8px] pb-[8px] pl-[18px] leading-[23px] pr-4 bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2211%22%20height=%228%22%20viewBox=%220%200%2011%208%22%20fill=%22none%22><path%20d=%22M0.79834%201.54863L5.49682%206.24711L10.1953%201.54863%22%20stroke=%22%23828FA3%22%20stroke-width=%222%22/></svg>')] bg-no-repeat bg-[length:0.8rem] bg-[right_0.75rem_center]
             rounded px-3 py-2 dark:text-black">
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>

            <!-- Form Buttons -->
            <div class="flex flex-col gap-3 md:flex-row">
              <button id="saveNewTask" class="w-[300px] h-[40px] rounded-[20px] bg-indigo text-white font-bold text-[13px] leading-[23px] cursor-pointer">Save Changes</button>
              <buttton id="deleteTask" class="w-[300px] h-[40px] rounded-[20px] bg-red text-white font-bold text-[13px] leading-[23px] text-center pt-[8px] cursor-pointer">Delete Task</buttton>
            </div>

         </form>
         

    </div>
  `;

  // Append modal to body
  document.body.appendChild(modalWrapper);

  const titleInput = modalWrapper.querySelector("#title");
  const taskDescription = modalWrapper.querySelector("#description");
  const statusSelect = modalWrapper.querySelector("#taskStatus");
  const priorityStatus = modalWrapper.querySelector("#taskPriority");

  titleInput.value = task.title;
  taskDescription.value = task.description;
  statusSelect.value = task.status;
  priorityStatus.value = task.priority

  // delete task button
  const deleteTaskBtn = modalWrapper.querySelector("#deleteTask");
  deleteTaskBtn.addEventListener("click", () => {
    const taskId = parseInt(modalWrapper.getAttribute("data-task-id"));
    deleteTaskById(taskId);
    modalWrapper.remove();
  });

  // save task button
  const saveTaskBtn = modalWrapper.querySelector("#saveNewTask");
  saveTaskBtn.addEventListener("click", () => {
    const taskId = parseInt(modalWrapper.getAttribute("data-task-id")); 
    renderEditedTaskToTheDOM(taskId);
    modalWrapper.remove();
  });


  // Close modal on button click
  const closeModalBtn = modalWrapper.querySelector("#closeModalBtn");
  closeModalBtn.addEventListener("click", () => {
    modalWrapper.remove();
  });
}

/**
 * Update an existing task in localStorage and re-render it in the DOM.
 * - Validates that the task exists and has a non-empty title.
 * - Updates task properties from the modal form inputs.
 * - Replaces the old DOM element with the updated one.
 *
 * @param {number} taskId - The ID of the task being edited.
 */

// function renderEditedTaskToTheDOM(taskId) {
//   let tasks = JSON.parse(localStorage.getItem("allTasks")) || [];

//   // 1. Find the task to update
//   const taskIndex = tasks.findIndex(task => task.id === taskId);
//   if (taskIndex === -1) {
//     alert("Task not found.");
//     return;
//   }

//   // 2. Grab updated values from form
//   const updatedTitle = document.getElementById("title").value.trim();
//   const updatedDescription = document.getElementById("description").value.trim();
//   const updatedStatus = document.getElementById("taskStatus").value;
//   const updatedPriority = document.getElementById("taskPriority").value;

//   if (updatedTitle === null || updatedTitle === undefined || updatedTitle.trim().length === 0) {
//     // Focus the input so user knows where to type
//     document.getElementById("title").focus();
//     return;
//   }

//   // sort task by priority
//   tasks.sort((a, b) => {
//     const priorityOrder = { high: 1, medium: 2, low: 3 };
//     return priorityOrder[a.priority] - priorityOrder[b.priority];
//   });

//   // 3. Update the task in array
//   tasks[taskIndex] = {
//     ...tasks[taskIndex],
//     title: updatedTitle.charAt(0).toUpperCase() + updatedTitle.slice(1),
//     description: updatedDescription,
//     status: updatedStatus,
//     priority: updatedPriority
//   };

//   // 4. Save back to localStorage
//   localStorage.setItem("allTasks", JSON.stringify(tasks));

//   // 5. Remove old DOM element
//   const oldElement = document.querySelector(`li[data-id='${taskId}']`);
//   if (oldElement) {
//     oldElement.remove();
//   }

//   // 6. Re-render this one updated task
//   renderDataToTheDom(tasks[taskIndex]);

//   window.tasks = tasks;
// }


// delete current task
// function deleteTaskById(taskId) {
//   const userConfirmed = confirm("Do you want to delete this task?");
//   if (!userConfirmed) return;

//   // 1. Remove from tasks array
//   tasks = tasks.filter(task => task.id !== taskId);

//   // 2. Update localStorage
//   localStorage.setItem("allTasks", JSON.stringify(tasks));

//   // 3. Remove the DOM element (ensure both taskId and data-id are strings)
//   const elementToRemove = document.querySelector(`li[data-id='${taskId}']`);
//   if (elementToRemove) {
//     elementToRemove.remove();
//   }

//   // 4. Recalculate counts
//   recalcTaskCounts();
// }
function renderEditedTaskToTheDOM(taskId) {
  let tasks = JSON.parse(localStorage.getItem("allTasks")) || [];

  // 1. Find the task to update
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) {
    alert("Task not found.");
    return;
  }

  // 2. Grab updated values from form
  const updatedTitle = document.getElementById("title").value.trim();
  const updatedDescription = document.getElementById("description").value.trim();
  const updatedStatus = document.getElementById("taskStatus").value;
  const updatedPriority = document.getElementById("taskPriority").value;

  if (!updatedTitle) {
    document.getElementById("title").focus();
    return;
  }

  // 3. Update the task in array
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: updatedTitle.charAt(0).toUpperCase() + updatedTitle.slice(1),
    description: updatedDescription,
    status: updatedStatus,
    priority: updatedPriority
  };

  // 4. Save back to localStorage
  localStorage.setItem("allTasks", JSON.stringify(tasks));

  // 5. Remove old DOM element
  const oldElement = document.querySelector(`li[data-id='${taskId}']`);
  if (oldElement) {
    oldElement.remove();
  }

  // 6. Re-render this one updated task (sorting is handled inside renderDataToTheDom)
  renderDataToTheDom(tasks[taskIndex]);

  window.tasks = tasks;
}


/**
 * Open a confirmation modal to delete a task by its ID.
 * - If confirmed, removes the task from the global tasks array and localStorage.
 * - Updates the DOM and recalculates task counts.
 *
 * @param {number} taskId - The ID of the task to delete.
 * @returns {void}
 */
function deleteTaskById(taskId) {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.className = "fixed inset-0 z-50 flex items-center justify-center bg-black/50";

  // Modal container + content
  overlay.innerHTML = `
    <div class="bg-white dark:bg-dark-grey p-6 rounded-lg shadow-lg w-72 sm:w-80 md:w-96 text-center">
      <p class="text-gray-800 dark:text-white text-lg font-semibold mb-4">
        Do you want to delete this task?
      </p>
      <div class="flex justify-center gap-4">
        <button id="confirmDelete" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Delete
        </button>
        <button id="cancelDelete" class="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 
          dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500">
          Cancel
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Handle confirm button
  overlay.querySelector("#confirmDelete").addEventListener("click", () => {
    // 1. Remove from tasks array
    tasks = tasks.filter(task => task.id !== taskId);

    // 2. Update localStorage
    localStorage.setItem("allTasks", JSON.stringify(tasks));

    // 3. Remove the DOM element
    const elementToRemove = document.querySelector(`li[data-id='${taskId}']`);
    if (elementToRemove) {
      elementToRemove.remove();
    }

    // 4. Recalculate counts
    recalcTaskCounts();

    // Close modal
    overlay.remove();
  });

  // Handle cancel button
  overlay.querySelector("#cancelDelete").addEventListener("click", () => {
    overlay.remove();
  });
}

/**
 * Recalculate the counts of tasks in each status category
 * and update the headings in the DOM.
 *
 * @returns {void}
 */
function recalcTaskCounts() {
  todoCount = tasks.filter(t => t.status === "todo").length;
  inProgressCount = tasks.filter(t => t.status === "doing").length;
  doneCount = tasks.filter(t => t.status === "done").length;

  todoHeading.textContent = `TODO (${todoCount})`;
  inProgressHeading.textContent = `IN PROGRESS (${inProgressCount})`;
  doneHeading.textContent = `DONE (${doneCount})`;
}

/**
 * Initialize and handle mobile navigation menu.
 * - Opens a modal-style mobile navigation when toggle button is clicked.
 * - Provides backdrop, board list, "Launch Career" button, and theme toggle.
 * - Closes when close button is clicked.
 *
 * @function mobileNav
 * @returns {void}
 */
mobileNav()
function mobileNav() {
  const toggleBtn = document.getElementById("toggleMobileNav");

  toggleBtn.addEventListener("click", function () {
    // Create container for mobile nav
    const navContainer = document.createElement("section");

    navContainer.innerHTML = `
      <!-- Backdrop -->
      <div class="bg-black opacity-50 fixed top-[65px] left-0 right-0 w-full h-[130vh]"></div>

      <!-- Navigation Container: Holding light/dark toggle button -->
      <div class="MobileNav">
        <div class="flex items-center justify-between mb-[19px]">
          <h4 class="text-[12px] pl-[59px] tracking-[2.4px] text-medium-grey font-bold leading-[100%] ">ALL BOARDS (1)</h4>
          <img class="mr-[14.15px]" id="closeButton"
            src="./assets/images/Group 45.svg" alt="close button">
        </div>
        
        <button tabindex="0" class="mt-[19px] mb-[31px] w-[293px] h-[49px] rounded-tr-[100px] rounded-br-[100px] bg-[#635FC7] text-white font-bold text-[15px] leading-[100%]">
          Launch Career
        </button>
       
        <div class="bg-[#F4F7FD] dark:bg-indigo w-[260px] h-[48px] rounded-[6px] relative left-0 right-0 mx-auto pt-[10px] pb-[17px] text-center flex items-center justify-center gap-4">
    
          <div class="relative flex items-center justify-center 
            before:content-['☀️'] before:absolute before:-left-6 before:text-xl 
            after:content-['🌑'] after:absolute after:-right-6 after:text-xl">

            <!-- Hidden Checkbox -->
            <input type="checkbox" id="mobileToggleBtn" class="absolute invisible peer" />

            <label for="mobileToggleBtn"
              class=" block w-[40px] h-[20px] rounded-full bg-[#635FC7] cursor-pointer relative peer-checked:bg-[#635FC7] mx-[10px] dark:bg-very-dark-grey peer-checked:dark:bg-very-dark-grey
              after:content-[''] after:w-[14px] after:h-[14px] after:bg-white after:absolute after:rounded-full after:top-[3px] after:left-[4px] after:transition-[left] after:duration-300
              peer-checked:after:left-[20px]">
            </label>

          </div>
        </div>
      </div>
    `;

    // Append nav to body
    document.body.appendChild(navContainer);

    // Removes the modal when clicked
    const closeButton = navContainer.querySelector("#closeButton");
    closeButton.addEventListener("click", function () {
      navContainer.remove(); 
    });

  })
}

/**
 * Initialize "New Task" modal.
 * - Opens when any element with #newTaskButton is clicked.
 * - Contains form fields for creating a new task.
 * - Closes when close button or backdrop is clicked.
 *
 * @function newTaskModal
 * @returns {void}
 */
newTaskModal()
function newTaskModal() {
  document.querySelectorAll("#newTaskButton").forEach(btn => {
    btn.addEventListener("click", () => {
      const modalPopUp = document.createElement("section");
      modalPopUp.classList.add("fixed", "top-0", "left-0", "w-full", "h-full", "z-50");
      modalPopUp.innerHTML = `
        <!-- Backdrop -->
        <div class="bg-black opacity-50 fixed top-0 left-0 w-full h-[130vh]"></div>

        <div id="formContainer" class="bg-white dark:bg-dark-grey absolute top-[69px] lg:top-[249px] left-0 right-0 m-auto w-[343px] md:w-[600px] p-[24px] rounded-[6px] h-[560px] md:h-[587px] flex flex-col g-[24px]">

          <div class="flex items-center justify-between pb-4">
            <h2 class="text-[18px] dark:text-white font-bold leading-100%">New Task</h2>
                    
            <img src="./assets/images/Group 45.svg" id="closeButton" alt="close button">
          </div>

          <!-- Form Container -->
        <form>
          <!-- Task Title -->
          <label for="title" class="text-[12px] font-bold text-medium-grey">Title</label>
          <div class="mt-[8px] relative">
            <input id="title" name="title" type="text" placeholder="e.g. Take chilled break" required class="relative dark:text-black font-body border border-gray-300 rounded h-[40px] w-full pt-[8px] pb-[9px] pl-[18px] mb-[24px]  text-[13px]"/>
            <!-- Error Message -->
            <p id="errorMessage" class="hidden absolute w-[180px] bg-white text-medium-grey rounded-[8px] right-0 top-[20px] shadow-custom-shadow py-[10px] px-[20px] text-[13px] text-center">❗ Please fill out this field.</p>
          </div>

          <!-- Task Description -->
          <label for="description" class="text-[12px] font-bold text-medium-grey">Description</label>
          <textarea id="description" name="description" placeholder="e.g. Pet your dog, have a cup of coffee, dance to your favourite song and come back to conquer this challenge. 💪🏾" required
            class="h-[112px] text-[13px] border border-gray-300 rounded w-full pt-[8px] pb-[9px] pl-[18px] pr-[18px] mb-[24px] mt-[8px] dark:text-black"></textarea>

          <!-- Task Status -->
          <label for="taskStatus" class="mb-[8px] text-[12px] font-bold text-medium-grey">Status</label>
          <div class="w-full border border-green-300 rounded flex items-center justify-between mb-[24px] mt-[8px]">
            <select id="taskStatus" class="appearance-none font-body text-[13px] w-full pt-[8px] pb-[8px] pl-[18px] leading-[23px] pr-4 bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2211%22%20height=%228%22%20viewBox=%220%200%2011%208%22%20fill=%22none%22><path%20d=%22M0.79834%201.54863L5.49682%206.24711L10.1953%201.54863%22%20stroke=%22%23828FA3%22%20stroke-width=%222%22/></svg>')] bg-no-repeat bg-[length:0.8rem] bg-[right_0.75rem_center]
          border border-gray-400 rounded px-3 py-2 dark:text-black">
              <option value="todo">todo</option>
              <option value="doing">in progress</option>
              <option value="done">done</option>
            </select>
          </div>

          <!-- Task Priority -->
          <label for="taskPriority" class="mb-[8px] text-[12px] font-bold text-medium-grey">Priority</label>
          <div class="w-full border border-gray-300 rounded flex items-center justify-between mb-[24px] mt-[8px]">
            <select id="taskPriority" class="appearance-none font-body text-[13px] w-full pt-[8px] pb-[8px] pl-[18px] leading-[23px] pr-4 bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2211%22%20height=%228%22%20viewBox=%220%200%2011%208%22%20fill=%22none%22><path%20d=%22M0.79834%201.54863L5.49682%206.24711L10.1953%201.54863%22%20stroke=%22%23828FA3%22%20stroke-width=%222%22/></svg>')] bg-no-repeat bg-[length:0.8rem] bg-[right_0.75rem_center]
          border border-gray-400 rounded px-3 py-2 dark:text-black">
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
          </div>

          <!-- Form Buttons -->
          <button id="createNewTask" class="w-[290px] h-[40px] rounded-[20px] bg-[#635FC7] text-white font-bold text-[13px] leading-[23px] md:w-[424px] md:m-auto md:flex md:items-center md:justify-center">Create Task</button>
          
        </form>

        </div>
      `;
      document.body.appendChild(modalPopUp);

      modalPopUp.querySelector("#createNewTask").addEventListener("click", e => {
        e.preventDefault();
        // if (getNewTaskDetails()) modalPopUp.remove();
        const taskCreated = getNewTaskDetails(); 
         // check if title is entered from user
        if (taskCreated) { // Only close if a task was added
        modalPopUp.remove();
        }
      });

      modalPopUp.querySelector("#closeButton").addEventListener("click", () => modalPopUp.remove());
    });
  });
}

/**
 * Collect and validate details for a new task from modal form.
 * - Validates that a title is entered (shows error if not).
 * - Generates a new task ID based on existing tasks.
 * - Pushes new task into global `tasks` array and sorts by priority.
 * - Renders task to DOM and saves to localStorage.
 *
 * @function getNewTaskDetails
 * @returns {boolean} True if task was successfully created, false otherwise.
 */
function getNewTaskDetails() {
  // calculate the id of task entered by user and have it start at the last id from array
  // let id = tasks[tasks.length - 1 ].id + 1
  let id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
  // id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1 another way to calculate the id

  // get user title, description and status entered
  let title = document.getElementById("title").value.trim();
  let description = document.getElementById("description").value;
  let status = document.getElementById("taskStatus").value;
  let priority = document.getElementById("taskPriority").value
  let errorMessage = document.getElementById("errorMessage");

  if (title === null || title === undefined || title.trim().length === 0) {
    // Focus the input so user knows where to type
    document.getElementById("title").focus();
    errorMessage.classList.remove("hidden")
    return false; 
  } else {
    errorMessage.classList.add("hidden")  
  }

  title = title.charAt(0).toUpperCase() + title.slice(1);

  // Create new task
  const newTask = { id, title, description, status, priority };

  // Push new task to the array
  tasks.push(newTask);
  // sort task by priority
  tasks.sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  renderDataToTheDom(newTask);

  // Save new tasks to local storage that persists on page load
  // saveTasksToLocalStorage(tasks);
  localStorage.setItem("allTasks", JSON.stringify(tasks));
  return true;
}

/**
 * Toggle visibility of the sidebar when the "hide" button is clicked.
 * - Hides sidebar if visible.
 * - Shows sidebar again when "show" button is clicked.
 *
 * @event hideSidebarBtn#click
 * @event showSidebarBtn#click
 */
hideSidebarBtn.addEventListener("click", () => {
  if (sidebar.style.display === "none") {
    sidebar.style.display = ""; 
  } else {
    sidebar.style.display = "none";
  }
  showSidebarBtn.style.display = "block"
});

showSidebarBtn.addEventListener("click", () => {
  if (sidebar.style.display === "none") {
    sidebar.style.display = "block";
  }
  showSidebarBtn.style.display = "none";
});

// if (localStorage.theme === 'dark') {
//   document.documentElement.classList.add('dark');
// }

// function toggleTheme(enabled) {
//   const desktopToggle = document.getElementById('desktopToggleBtn');
//   const mobileToggle = document.getElementById('mobileToggleBtn');
//   const logoChange = document.getElementById("kanbanLogo")

//     if (enabled) {
//     document.documentElement.classList.add('dark');
//     localStorage.theme = 'dark';
//     logoChange.src = "../assets/images/kanban-dark.svg";
//   } else {
//     document.documentElement.classList.remove('dark');
//     localStorage.theme = 'light';
//     logoChange.src = "../assets/images/kanban.svg";
//     }

//   // Sync both toggles if they exist in DOM
//   if (desktopToggle) desktopToggle.checked = enabled;
//   if (mobileToggle) mobileToggle.checked = enabled;
// }

// // Attach listeners for existing toggles
// document.addEventListener('change', (e) => {
//   if (e.target.id === 'desktopToggleBtn' || e.target.id === 'mobileToggleBtn') {
//     toggleTheme(e.target.checked);
//   }
// });

/**
 * Toggle dark/light theme across the application.
 * - Updates HTML root class and stores preference in localStorage.
 * - Updates logo and syncs desktop and mobile toggle switches.
 *
 * @function toggleTheme
 * @param {boolean} enabled - True for dark mode, false for light mode.
 * @returns {void}
 */
if (localStorage.theme === 'dark') {
  document.documentElement.classList.add('dark');
}

function toggleTheme(enabled) {
  const desktopToggle = document.getElementById('desktopToggleBtn');
  const mobileToggle = document.getElementById('mobileToggleBtn');
  const logoChange = document.getElementById("kanbanLogo");

  if (enabled) {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
    if (logoChange) logoChange.src = "../assets/images/kanban-dark.svg";
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
    if (logoChange) logoChange.src = "../assets/images/kanban.svg";
  }

  // Sync both toggles if they exist in DOM
  if (desktopToggle) desktopToggle.checked = enabled;
  if (mobileToggle) mobileToggle.checked = enabled;
}

/**
 * Listen for theme toggle changes on desktop and mobile switches.
 * Applies theme immediately on change.
 *
 * @event document#change
 */
document.addEventListener('change', (e) => {
  if (e.target.id === 'desktopToggleBtn' || e.target.id === 'mobileToggleBtn') {
    toggleTheme(e.target.checked);
  }
});

/**
 * On DOM load, initialize theme based on localStorage setting.
 *
 * @event window#DOMContentLoaded
 */
window.addEventListener('DOMContentLoaded', () => {
  toggleTheme(localStorage.theme === 'dark');
});
