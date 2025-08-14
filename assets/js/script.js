
// import { saveTasksToLocalStorage, loadTasksFromLocalStorage } from "./utils/localStorage.js";
// import { renderTasksToTheDom,  } from "./ui/renderTasks.js";
// import { newTaskModal } from "./tasks/newTaskModal.js";
// import { mobileNav } from "./ui/mobileNav.js";
// import { sidebarToggle } from "./utils/sidebarToggle.js";
// import { setupThemeToggle } from "./utils/toggleTheme.js";

// // Shared in-memory task array
// export let tasks = [];

// // Shared DOM elements
// export const todoColumn = document.getElementById("todoColumn");
// export const inProgressColumn = document.getElementById("inProgressColumn");
// export const doneColumn = document.getElementById("doneColumn");

// export const todoHeading = document.getElementById("todo-heading");
// export const inProgressHeading = document.getElementById("doing-heading");
// export const doneHeading = document.getElementById("done-heading");

// Fetch tasks from API


// async function fetchTasks() {
//   // add loading element while data is being fetched
  
//   try {
//     const response = await fetch("https://jsl-kanban-api.vercel.app/");
//     if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

//     const data = await response.json();
//     tasks = [...data];
//     console.log(tasks)

//     saveTasksToLocalStorage(tasks);

//     tasks.forEach(renderTasksToTheDom);

//   } catch (err) {
//     console.error(err);
//   }
// }

// console.log( fetchTasks() )

// function taskboardApp() {
//   setupThemeToggle();
//   loadTasksFromLocalStorage();
//   tasks.forEach(renderTasksToTheDom);

//   newTaskModal();
//   mobileNav();
//   sidebarToggle();

//   fetchTasks();
// }

// document.addEventListener("DOMContentLoaded", taskboardApp);

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


/**
 * Fetch data from API
*/

fetchData();

async function fetchData() {
  // show the loading message while fetching data from API
  alert("Fetching data... please wait.");

  try {
    const response = await fetch("https://jsl-kanban-api.vercel.app/");

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();
    console.log(data); // This is an array

    // Save to localStorage
    localStorage.setItem("apiData", JSON.stringify(data));

    // Loop through and render each item
    data.forEach(task => renderDataToTheDom(task));

  } catch (error) {
    console.error(error);
    alert("Failed to fetch tasks from API.");
  } 
}


/**
 * Render tasks to the DOM
 * @typedef {Object} Task
 * @param {Task} task - The task object to display
*/
function renderDataToTheDom(tasks) {
  const listElement = document.createElement("li");
  listElement.className =
    "task mb-[21px] bg-white h-[65px] pt-[20px] px-[19px] pb-[21px] rounded-lg text-[15px] font-bold leading-[100%] text-rich-black shadow-custom-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo dark:bg-dark-grey dark:text-white";
  listElement.setAttribute("tabindex", "0");
  listElement.textContent = tasks.title;

  listElement.addEventListener("click", () => renderTaskModal(tasks));

  if (tasks.status === "todo") {
    todoColumn.appendChild(listElement);
    todoCount++;
    todoHeading.textContent = `TODO (${todoCount})`;
  } else if (tasks.status === "doing") {
    inProgressColumn.appendChild(listElement);
    inProgressCount++;
    inProgressHeading.textContent = `IN PROGRESS (${inProgressCount})`;
  } else if (tasks.status === "done") {
    doneColumn.appendChild(listElement);
    doneCount++;
    doneHeading.textContent = `DONE (${doneCount})`;
  }
}

/**
 * Render task modal popup
 * @typedef {Object} Task
 * @param {Task} task - The task object to display
*/

function renderTaskModal(task) {
  const modalWrapper = document.createElement("section");
  modalWrapper.classList.add("fixed", "top-0", "left-0", "w-full", "h-full", "z-50");
  modalWrapper.innerHTML = `
    <!-- Backdrop -->
      <div class="bg-black opacity-50 fixed top-0 left-0 w-full h-[130vh]"></div>

      <!-- Form Container -->
      <div id="formContainer" class="bg-white dark:bg-dark-grey absolute top-[64px] lg:top-[210px] left-0 right-0 m-auto w-[343px] md:w-[600px] p-[24px] rounded-[6px] h-[600px] md:h-[560px] flex flex-col g-[24px]">

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
            <div class="flex flex-col gap-[10px] md:flex-row">
              <button class="w-[300px] h-[40px] rounded-[20px] bg-indigo text-white font-bold text-[13px] leading-[23px]">Save Changes</button>
              <buttton class="w-[300px] h-[40px] rounded-[20px] bg-red text-white font-bold text-[13px] leading-[23px] text-center pt-[8px]">Delete Task</buttton>
            </div>

         </form>
         

    </div>
  `;

  // Append modal to body
  document.body.appendChild(modalWrapper);

  const titleInput = modalWrapper.querySelector("#title");
  const taskDescription = modalWrapper.querySelector("#description");
  const statusSelect = modalWrapper.querySelector("#taskStatus");

  titleInput.value = task.title;
  taskDescription.value = task.description;
  statusSelect.value = task.status;

  // Close modal on button click
  const closeModalBtn = modalWrapper.querySelector("#closeModalBtn");
  closeModalBtn.addEventListener("click", () => {
    modalWrapper.remove();
  });
}

/**
 * save edited tasks
*/

/**
 * Render edited tasks to the DOM
*/
function renderEditedTaskToTheDOM(task) {
  const listElement = document.createElement("li");
  listElement.className ="task mb-[21px] bg-white h-[65px] pt-[20px] px-[19px] pb-[21px] rounded-lg text-[15px] font-bold leading-[100%] text-rich-black shadow-custom-shadow cursor-pointer flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-indigo dark:bg-dark-grey dark:text-white";
  listElement.setAttribute("tabindex", "0");

  const priority = document.createElement("span");
  priority.textContent = task.title;
  listElement.appendChild(priority);

  if(task.priority) {
    const dot = document.createElement("span");
    dot.className = "w-[10px] h-[10px] roundrounded-full ml-auto";

    if(task.priority === "high") {
      dot.style.backgroundColor = "red";
    } else if(task.priority === "medium") {
      dot.style.backgroundColor = "orange";
    } else if(task.priority === "low") {
      dot.style.backgroundColor = "green";
    }
    listElement.appendChild(dot)
  }

  // Open edit modal
  listElement.addEventListener("click", () => renderTaskModal(task));

  // determine column task needs to be in
  const column = task.status === "todo" ? todoColumn : task.status === "doing" ? inProgressColumn : doneColumn;

  if(task.priority) {
    column.prepend(listElement)
  } else {
    column.appendChild(listElement)
  }

  // Update the counts of tasks in column
   if (task.status === "todo") {
    todoCount++;
    todoHeading.textContent = `TODO (${todoCount})`;
  } else if (task.status === "doing") {
    inProgressCount++;
    inProgressHeading.textContent = `IN PROGRESS (${inProgressCount})`;
  } else if (task.status === "done") {
    doneCount++;
    doneHeading.textContent = `DONE (${doneCount})`;
  }

}

/**
 * Render mobile navigation to the DOM
*/
// document.getElementById("toggleMobileNav").addEventListener("click", function() {
//   // Create a new element
//     const navContainer = document.createElement("div");

//     navContainer.innerHTML = `
//       <!-- Backdrop -->
//       <div class="bg-black opacity-50 fixed top-[65px] left-0 right-0 w-full h-[130vh]"></div>

//       <!-- Navigation Container: Holding light/dark toggle button -->
//       <div class="MobileNav">
//         <div class="flex items-center justify-between mb-[19px]">
//           <h4 class="text-[12px] pl-[59px] tracking-[2.4px] text-medium-grey font-bold leading-[100%] ">ALL BOARDS (1)</h4>
//           <img class="mr-[14.15px]" id="closeButton"
//             src="./assets/images/Group 45.svg" alt="close button">
//         </div>
        
//         <button tabindex="0" class="mt-[19px] mb-[31px] w-[293px] h-[49px] rounded-tr-[100px] rounded-br-[100px] bg-[#635FC7] text-white font-bold text-[15px] leading-[100%]">
//           Launch Career
//         </button>
       
//         <div class="bg-[#F4F7FD] dark:bg-indigo w-[260px] h-[48px] rounded-[6px] relative left-0 right-0 mx-auto pt-[10px] pb-[17px] text-center flex items-center justify-center gap-4">
    
//           <div class="relative flex items-center justify-center 
//             before:content-['☀️'] before:absolute before:-left-6 before:text-xl 
//             after:content-['🌑'] after:absolute after:-right-6 after:text-xl">

//             <!-- Hidden Checkbox -->
//             <input type="checkbox" id="mobileToggleBtn" class="absolute invisible peer" />

//             <label for="mobileToggleBtn"
//               class=" block w-[40px] h-[20px] rounded-full bg-[#635FC7] cursor-pointer relative peer-checked:bg-[#635FC7] mx-[10px] dark:bg-very-dark-grey peer-checked:dark:bg-very-dark-grey
//               after:content-[''] after:w-[14px] after:h-[14px] after:bg-white after:absolute after:rounded-full after:top-[3px] after:left-[4px] after:transition-[left] after:duration-300
//               peer-checked:after:left-[20px]">
//             </label>

//           </div>
//         </div>
//       </div>
//     `;
//   // Append the new div to the container
//     document.body.appendChild(navContainer);

//     // Removes the modal when clicked
//     const closeButton = navContainer.querySelector("#closeButton");
//     closeButton.addEventListener("click", function () {
//       navContainer.remove(); 
//     });

// });
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
 * Render new task modal popup
*/
// document.querySelectorAll("#newTaskButton").forEach(btn => {
//   btn.addEventListener("click", function () {

//   // Create a new element for popup Modal asking user to add new task
//   const modalPopUp = document.createElement("section");
//   // modalPopUp.classList.add("absolute top-0 w-full ")

//   modalPopUp.innerHTML = `
//     <!-- Backdrop -->
//         <div class="bg-black opacity-50 fixed top-0 left-0 w-full h-[130vh]"></div>

//         <div id="formContainer" class="bg-white dark:bg-dark-grey absolute top-[69px] lg:top-[210px] left-0 right-0 m-auto w-[343px] md:w-[600px] p-[24px] rounded-[6px] h-[560px] md:h-[587px] flex flex-col g-[24px]">

//           <div class="flex items-center justify-between pb-4">
//             <h2 class="text-[18px] dark:text-white font-bold leading-100%">New Task</h2>
                    
//             <img src="./assets/images/Group 45.svg" id="closeButton" alt="close button">
//           </div>

//           <!-- Form Container -->
//         <form>
//           <!-- Task Title -->
//           <label for="title" class="text-[12px] font-bold text-medium-grey">Title</label>
//           <div class="mt-[8px] relative">
//             <input id="title" name="title" type="text" placeholder="e.g. Take chilled break" required class="relative dark:text-black font-body border border-gray-300 rounded h-[40px] w-full pt-[8px] pb-[9px] pl-[18px] mb-[24px]  text-[13px]"/>
//             <!-- Error Message -->
//             <p id="errorMessage" class="absolute w-[180px] h-[48px] bg-white text-medium-grey rounded-[8px] right-[25px] left-[128px] top-[55px] shadow-custom-shadow pt-[12px] text-[13px] text-center">❗ Please fill out this field.</p>
//           </div>

//           <!-- Task Description -->
//           <label for="description" class="text-[12px] font-bold text-medium-grey">Description</label>
//           <textarea id="description" name="description" placeholder="e.g. Pet your dog, have a cup of coffee, dance to your favourite song and come back to conquer this challenge. 💪🏾" required
//             class="h-[112px] text-[13px] border border-gray-300 rounded w-full pt-[8px] pb-[9px] pl-[18px] pr-[18px] mb-[24px] mt-[8px] dark:text-black"></textarea>

//           <!-- Task Status -->
//           <label for="taskStatus" class="mb-[8px] text-[12px] font-bold text-medium-grey">Status</label>
//           <div class="w-full border border-green-300 rounded flex items-center justify-between mb-[24px] mt-[8px]">
//             <select id="taskStatus" class="appearance-none font-body text-[13px] w-full pt-[8px] pb-[8px] pl-[18px] leading-[23px] pr-4 bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2211%22%20height=%228%22%20viewBox=%220%200%2011%208%22%20fill=%22none%22><path%20d=%22M0.79834%201.54863L5.49682%206.24711L10.1953%201.54863%22%20stroke=%22%23828FA3%22%20stroke-width=%222%22/></svg>')] bg-no-repeat bg-[length:0.8rem] bg-[right_0.75rem_center]
//           border border-gray-400 rounded px-3 py-2 dark:text-black">
//               <option value="todo">todo</option>
//               <option value="doing">in progress</option>
//               <option value="done">done</option>
//             </select>
//           </div>

//           <!-- Task Priority -->
//           <label for="taskPriority" class="mb-[8px] text-[12px] font-bold text-medium-grey">Priority</label>
//           <div class="w-full border border-gray-300 rounded flex items-center justify-between mb-[24px] mt-[8px]">
//             <select id="taskPriority" class="appearance-none font-body text-[13px] w-full pt-[8px] pb-[8px] pl-[18px] leading-[23px] pr-4 bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2211%22%20height=%228%22%20viewBox=%220%200%2011%208%22%20fill=%22none%22><path%20d=%22M0.79834%201.54863L5.49682%206.24711L10.1953%201.54863%22%20stroke=%22%23828FA3%22%20stroke-width=%222%22/></svg>')] bg-no-repeat bg-[length:0.8rem] bg-[right_0.75rem_center]
//           border border-gray-400 rounded px-3 py-2 dark:text-black">
//               <option value="low">low</option>
//               <option value="medium">medium</option>
//               <option value="high">high</option>
//             </select>
//           </div>

//           <!-- Form Buttons -->
//           <button id="createNewTask" class="w-[290px] h-[40px] rounded-[20px] bg-[#635FC7] text-white font-bold text-[13px] leading-[23px] md:w-[424px] md:m-auto md:flex md:items-center md:justify-center">Create Task</button>
          
//         </form>

//         </div>
//   `;

//   document.body.appendChild(modalPopUp);

//   // Add event listener for the submit button to call the getTaskDetails function
//   document.getElementById("createNewTask").addEventListener("click", function(e) {
//     e.preventDefault(); // Prevent default form submit

//     const taskCreated = getNewTaskDetails(); 
//     // check if title is entered from user
//     if (taskCreated) { // Only close if a task was added
//       modalPopUp.remove();
//     }
//   });
  
//   // Removes the whole dynamic content when clicked
//     modalPopUp.querySelector("#closeButton").addEventListener("click", () => modalPopUp.remove());
//   });
// });

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
            <p id="errorMessage" class="absolute w-[180px] h-[48px] bg-white text-medium-grey rounded-[8px] right-[25px] left-[128px] top-[55px] shadow-custom-shadow pt-[12px] text-[13px] text-center">❗ Please fill out this field.</p>
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
 * Get new task details
*/
function getNewTaskDetails() {
  // calculate the id of task entered by user and have it start at the last id from array
  let id = initialTasks[initialTasks.length - 1 ].id + 1

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
  const newTask = { id, title, description, status, priority: priority || null };

  // Push new task to the array
  tasks.push(newTask);
  renderDataToTheDom(newTask);

  // Save new tasks to local storage that persists on page load
  saveTasksToLocalStorage(tasks);
  return true;
}

// creates a error message that pops up when you try to create a new task without a title



// when the save button on the existing task is clicked
function renderNewTasksToTheDom(task) {
  const listElement = document.createElement("li");
  listElement.className =
    "task mb-[21px] bg-white h-[65px] pt-[20px] px-[19px] pb-[21px] rounded-lg text-[15px] font-bold leading-[100%] text-rich-black shadow-custom-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo dark:bg-dark-grey dark:text-white";
  listElement.setAttribute("tabindex", "0");

  listElement.textContent = task.title;
  if (task.priority) listElement.textContent += ` [${task.priority}]`;

  listElement.addEventListener("click", () => renderTaskModal(task));
  
  // Add new task created to the correct column
  if(task.status === "todo") {
    if(task.priority) {
      todoColumn.prepend(listElement);
    } else {
      todoColumn.appendChild(listElement)
    }
    todoCount++;
    todoHeading.textContent = `TODO (${todoCount})`;
  }
}

// code for when the delete button is clicked



/**
 * Add and remove sidebar on click
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

/**
 * Dark and Light Theme Switch Button
 */
if (localStorage.theme === 'dark') {
  document.documentElement.classList.add('dark');
}

function toggleTheme(enabled) {
  const desktopToggle = document.getElementById('desktopToggleBtn');
  const mobileToggle = document.getElementById('mobileToggleBtn');

   if (enabled) {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  }

  // Sync both toggles if they exist in DOM
  if (desktopToggle) desktopToggle.checked = enabled;
  if (mobileToggle) mobileToggle.checked = enabled;
}

// Attach listeners for existing toggles
document.addEventListener('change', (e) => {
  if (e.target.id === 'desktopToggleBtn' || e.target.id === 'mobileToggleBtn') {
    toggleTheme(e.target.checked);
  }
});

// const themeToggle = document.getElementById('theme-toggle');
const desktopToggle = document.getElementById('desktopToggleBtn');
const mobileToggle = document.getElementById('mobileToggleBtn');

// Check localStorage for preferred theme on page load
if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
  desktopToggle.checked = true; // Set checkbox state if dark mode is active
} else {
  document.documentElement.classList.remove('dark');
  desktopToggle.checked = false;
}

// Add event listener for theme toggle
desktopToggle.addEventListener('change', () => {
if (desktopToggle.checked) {
  document.documentElement.classList.add('dark');
  localStorage.setItem('theme', 'dark');
} else {
  document.documentElement.classList.remove('dark');
  localStorage.setItem('theme', 'light');
}
});

desktopToggle.addEventListener('change', () => {
if (desktopToggle.checked) {
  document.documentElement.classList.add('dark');
  localStorage.setItem('theme', 'dark');
} else {
  document.documentElement.classList.remove('dark');
  localStorage.setItem('theme', 'light');
}
});