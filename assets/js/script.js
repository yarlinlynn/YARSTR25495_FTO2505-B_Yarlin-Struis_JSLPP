
import { initialTasks } from "../js/initialData.js";

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
 * Save tasks to localStorage
*/
const savedTasks = JSON.parse(localStorage.getItem('myKey')) || [];
if (savedTasks.length > 0) {
  initialTasks.length = 0;
  initialTasks.push(...savedTasks);
}

// Render all tasks to the DOM
initialTasks.forEach(renderTasksToTheDom);

/**
 * Render tasks to the DOM
*/
function renderTasksToTheDom(task) {
  const listElement = document.createElement("li");
  listElement.className = "task mb-[21px] bg-white h-[65px] pt-[20px] px-[19px] pb-[21px] rounded-lg text-[15px] font-bold leading-[100%] text-rich-black shadow-custom-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo";
  listElement.setAttribute("tabindex", "0");
  listElement.textContent = task.title;

  // Show modal
  listElement.addEventListener("click", () => renderTaskModal(task));

  // check the status and put each in their respective columns
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

/**
 * Render task modal popup
*/
function renderTaskModal(task) {
  const modalWrapper = document.createElement("section");
  modalWrapper.classList.add("fixed", "top-0", "left-0", "w-full", "h-full", "z-50");
  modalWrapper.innerHTML = `
    <!-- Backdrop -->
      <div class="bg-black opacity-50 fixed top-0 left-0 w-full h-[130vh]"></div>

      <!-- Form Container -->
      <div id="formContainer" class="bg-white absolute top-[99px] lg:top-[242px] left-0 right-0 m-auto w-[343px] md:w-[600px] p-[24px] rounded-[6px] h-[410px] md:h-[415px] flex flex-col g-[24px]">

        <div class="flex items-center justify-between pb-4">
          <h2 class="text-[18px] font-bold leading-100%">Task</h2>
                  
          <img src="./assets/images/Group 45.svg" id="closeModalBtn" alt="close button">
        </div>

        <!-- Form Container -->
         <form>
            <!-- Task Title -->
            <label for="title" class="text-[12px] font-bold text-medium-grey">Title</label>
            <input id="title" name="title" type="text" placeholder="e.g. Take chilled break" class="relative font-body border border-gray-300 rounded h-[40px] w-full pt-[8px] pb-[9px] pl-[18px] mb-[24px] mt-[8px] text-[13px]"/>

            <!-- Task Description -->
            <label for="description" class="text-[12px] font-bold text-medium-grey">Description</label>
            <textarea id="description" name="description" 
              class="h-[112px] text-[13px] border border-gray-300 rounded w-full pt-[8px] pb-[9px] pl-[18px] pr-[18px] mb-[24px] mt-[8px]"></textarea>

            <!-- Task Status -->
            <label for="taskStatus" class="mb-[8px] text-[12px] font-bold text-medium-grey">Status</label>
            <div class="w-full border border-green-300 rounded flex items-center justify-between mb-[24px] mt-[8px]">
              <select id="taskStatus" class="appearance-none font-body text-[13px] w-full pt-[8px] pb-[8px] pl-[18px] leading-[23px] pr-4 bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2211%22%20height=%228%22%20viewBox=%220%200%2011%208%22%20fill=%22none%22><path%20d=%22M0.79834%201.54863L5.49682%206.24711L10.1953%201.54863%22%20stroke=%22%23828FA3%22%20stroke-width=%222%22/></svg>')] bg-no-repeat bg-[length:0.8rem] bg-[right_0.75rem_center]
            border border-gray-400 rounded px-3 py-2">
                <option value="todo">todo</option>
                <option value="doing">in progress</option>
                <option value="done">done</option>
              </select>
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
 * Render mobile navigation to the DOM
*/
document.getElementById("toggleMobileNav").addEventListener("click", function() {
  // Create a new element
    const navContainer = document.createElement("div");

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
       
        <!-- Light and Dark Toggle Button -->
        <div class="bg-[#F4F7FD] w-[260px] h-[48px] rounded-[6px] relative left-0 right-0 mx-auto pt-[10px] pb-[17px] text-center flex items-center justify-center gap-4">
    
          <!-- Sun Icon -->
          <span class="text-xl">☀️</span>

          <!-- Toggle Switch -->
          <button id="themeToggle"
            class="w-[40px] h-[20px] bg-[#635FC7] rounded-[12px] flex items-center px-1 transition-all duration-300 relative"
            aria-label="Toggle Theme">
            <span id="toggleCircle"
              class="w-[14px] h-[14px] bg-white rounded-full transform transition-all duration-300"></span>
          </button>

          <!-- Moon Icon -->
          <span class="text-xl">🌑</span>
        </div>
      </div>
    `;
  // Append the new div to the container
    document.body.appendChild(navContainer);

    // Removes the modal when clicked
    const closeButton = navContainer.querySelector("#closeButton");
    closeButton.addEventListener("click", function () {
      navContainer.remove(); 
    });

});

/**
 * Render new task modal popup
*/
document.querySelectorAll("#newTaskButton").forEach(btn => {
  btn.addEventListener("click", function () {

  // Create a new element for popup Modal asking user to add new task
  const modalPopUp = document.createElement("section");
  // modalPopUp.classList.add("absolute top-0 w-full ")

  modalPopUp.innerHTML = `
    <!-- Backdrop -->
      <div class="bg-black opacity-50 fixed top-0 left-0 w-full h-[130vh]"></div>

      <div id="formContainer" class="bg-white absolute top-[99px] lg:top-[267px] left-0 right-0 m-auto w-[343px] md:w-[600px] p-[24px] rounded-[6px] h-[479px] md:h-[479px] flex flex-col g-[24px]">

        <div class="flex items-center justify-between pb-4">
          <h2 class="text-[18px] font-bold leading-100%">New Task</h2>
                  
          <img src="./assets/images/Group 45.svg" id="closeButton" alt="close button">
        </div>

        <!-- Form Container -->
       <form>
        <!-- Task Title -->
        <label for="newTitle" class="text-[12px] font-bold text-medium-grey">Title</label>
        <div class="mt-[8px] relative">
          <input id="newTitle" name="title" type="text" placeholder="e.g. Take chilled break" class="relative font-body border border-gray-300 rounded h-[40px] w-full pt-[8px] pb-[9px] pl-[18px] mb-[24px]  text-[13px]"/>
          <!-- Error Message -->
          <p id="errorMessage" class="hidden absolute w-[180px] h-[48px] bg-white text-medium-grey rounded-[8px] right-[25px] left-[128px] top-[55px] shadow-custom-shadow pt-[12px] text-[13px] text-center">❗ Please fill out this field.</p>
        </div>

        <!-- Task Description -->
        <label for="newDescription" class="text-[12px] font-bold text-medium-grey">Description</label>
        <textarea id="newDescription" name="description" 
          class="h-[112px] text-[13px] border border-gray-300 rounded w-full pt-[8px] pb-[9px] pl-[18px] pr-[18px] mb-[24px] mt-[8px]"></textarea>

        <!-- Task Status -->
        <label for="newTaskStatus" class="mb-[8px] text-[12px] font-bold text-medium-grey">Status</label>
        <div class="w-full border border-green-300 rounded flex items-center justify-between mb-[24px] mt-[8px]">
          <select id="newTaskStatus" class="appearance-none font-body text-[13px] w-full pt-[8px] pb-[8px] pl-[18px] leading-[23px] pr-4 bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2211%22%20height=%228%22%20viewBox=%220%200%2011%208%22%20fill=%22none%22><path%20d=%22M0.79834%201.54863L5.49682%206.24711L10.1953%201.54863%22%20stroke=%22%23828FA3%22%20stroke-width=%222%22/></svg>')] bg-no-repeat bg-[length:0.8rem] bg-[right_0.75rem_center]
         border border-gray-400 rounded px-3 py-2">
            <option value="todo">todo</option>
            <option value="doing">in progress</option>
            <option value="done">done</option>
          </select>
        </div>

        <!-- Form Buttons -->
        <button id="createNewTask" class="w-[290px] h-[40px] rounded-[20px] bg-[#635FC7] text-white font-bold text-[13px] leading-[23px] md:w-[424px] md:m-auto md:flex md:items-center md:justify-center">Create Task</button>
        
       </form>

      </div>
  `;

  document.body.appendChild(modalPopUp);



  // Add event listener for the submit button to call the getTaskDetails function
  document.getElementById("createNewTask").addEventListener("click", function(e) {
    e.preventDefault(); // Prevent default form submit

    const taskCreated = getNewTaskDetails(); 
    // check if title is entered from user
    if (taskCreated) { // Only close if a task was added
      modalPopUp.remove();
    }
  });
  
  // Removes the whole dynamic content when clicked
    const closeButton = modalPopUp.querySelector("#closeButton");
    closeButton.addEventListener("click", function () {
      modalPopUp.remove(); 
    });
  });
});

/**
 * Get new task details
*/
function getNewTaskDetails() {

  // calculate the id of task entered by user and have it start at the last id from array
  let id = initialTasks[initialTasks.length - 1 ].id + 1

  // get user title, description and status entered
  let title = document.getElementById("newTitle").value.trim()
  let description = document.getElementById("newDescription").value.trim()
  let status = document.getElementById("newTaskStatus").value

  let errorMessage = document.getElementById("errorMessage")

  // if string is empty show error message
  if (title === "") {
    errorMessage.style.display = "block"; 
    // errorMessage.classList.remove("hidden");
    return false;
  } else {
    // errorMessage.classList.add("hidden");
    errorMessage.style.display = "none";
  }

  title = title.charAt(0).toUpperCase() + title.slice(1);

  const newTask = { id, title, description, status };
  initialTasks.push(newTask);

  renderTasksToTheDom(newTask);
  // save new tasks to local storage that persists on page load
  localStorage.setItem('myKey', JSON.stringify(initialTasks));
  // logs all tasks in initialTask
  console.log("Tasks", initialTasks);
  return true;
}

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
  showSidebarBtn.style.display = "none"
})
