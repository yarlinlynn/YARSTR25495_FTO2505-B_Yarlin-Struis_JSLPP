
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
 * Render tasks to the DOM
*/
initialTasks.forEach((task) => {
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
});

/**
 * Save tasks to localStorage
*/
localStorage.setItem('myKey', JSON.stringify(initialTasks));
const retrievedData = JSON.parse(localStorage.getItem('myKey')) || [];
initialTasks.push(...retrievedData);

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
      <div id="formContainer" class="bg-white absolute top-[99px] lg:top-[249px] left-0 right-0 m-auto w-[343px] md:w-[600px] p-[24px] rounded-[6px] h-[532px] md:h-[478px] flex flex-col g-[24px]">

        <div class="flex items-center justify-between pb-4">
          <h2 class="text-[18px] font-bold leading-100%">Task</h2>
                  
          <img src="./assets/images/Group 45.svg" id="closeModalBtn" alt="close button">
        </div>

        <!-- Form Container -->
         <form>
          <!-- Task Title -->
          <div class="relative">
            <label for="title" class="mb-[8px] text-[12px] font-bold text-medium-grey">Title</label>
            <input id="title" name="title" type="text" class="relative font-body border border-gray-300 rounded h-[40px] w-full pt-[8px] pb-[9px] pl-[18px] mb-[24px] text-[13px]"/>
          </div>

          <!-- Task Description -->
           <div>
            <label for="description" class="mb-[8px] text-[12px] font-bold text-medium-grey">Description</label>
            <textarea id="description" name="description" class="h-[112px] text-[13px] border border-gray-300 rounded w-full pt-[8px] pb-[9px] pl-[18px] pr-[18px] mb-[24px]">
            </textarea>
           </div>

           <!-- Task Status -->
           <div class="relative  mb-[24px]">

            <select id="taskStatus" name="status" class="appearance-none font-body border border-gray-300 rounded w-full pt-[8px] pb-[9px] pl-[18px] mb-[24px] leading-[23px] text-[13px]">
              <option value="todo">todo</option>
              <option value="doing">in progress</option>
              <option value="done">done</option>
            </select>

            
            <div class="pointer-events-none absolute inset-y-0 flex items-center text-medium-grey right-[16.78px] top-[18.55px] bottom-[15.6px] w-[9.4px] h-[4.7px] md:w-[14px] md:h-[8px]">
              <svg class="" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>

          </div> 

          <!-- Form Buttons -->
          <div class="flex flex-col gap-[15px] md:flex-row">
            <button class="w-[300px] h-[40px] rounded-[20px] bg-indigo text-white font-bold text-[13px] leading-[23px]">Save Changes</button>
            <buttton class="w-[300px] h-[40px] rounded-[20px] bg-red text-white font-bold text-[13px] leading-[23px] text-center pt-[8px]">Delete Task</buttton>
          </div>

         </form>
         

      </div>
  `;

  // Append modal to body
  document.body.appendChild(modalWrapper);

  // Query modal inputs AFTER it's been added to DOM
  const titleInput = modalWrapper.querySelector("#title");
  const taskDescription = modalWrapper.querySelector("#description");
  const statusSelect = modalWrapper.querySelector("#taskStatus");

  // Set their values based on the clicked task
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

      <!-- Form Container -->
       <div id="formContainer" class="bg-white absolute top-[99px] lg:top-[249px] left-0 right-0 m-auto w-[343px] md:w-[600px] p-[24px] rounded-[6px] h-[479px] flex flex-col g-[24px]">

        <div class="flex items-center justify-between pb-4">
          <h2 class="text-[18px] font-bold leading-100%">New Task</h2>
                  
          <img src="./assets/images/Group 45.svg" id="closeButton" alt="close button">
        </div>

        <!-- Form Container -->
         <form>
          <!-- Task Title -->
           <div class="relative">
            <label for="newTitle" class="mb-[8px] text-[12px] font-bold text-medium-grey">Title</label>
            <input id="newTitle" name="title" type="text" placeholder="e.g. Take chilled break"
              class="relative font-body border border-gray-300 rounded h-[40px] w-full pt-[8px] pb-[9px] pl-[18px] mb-[24px] text-[13px]"
            />
            <!-- Error Message -->
            <p id="errorMessage" class="hidden absolute w-[180px] h-[48px] bg-white text-medium-grey rounded-[8px] right-[25px] left-[128px] top-[55px] shadow-custom-shadow pt-[12px] text-[13px] text-center">❗ Please fill out this field.</p>
           </div>

          <!-- Task Description -->
           <div>
            <label for="description" class="mb-[8px] text-[12px] font-bold text-medium-grey">Description</label>
            <input id="description" name="description" class="h-[112px] text-[13px] border border-gray-300 rounded w-full pt-[8px] pb-[9px] pl-[18px] pr-[18px] mb-[24px]">
            </input>
           </div>

          <!-- Task Status -->
          <div class="relative  mb-[24px]">
            <label for="newTaskStatus" class="mb-[8px] text-[12px] font-bold text-medium-grey">Status</label>
            <select id="newTaskStatus" name="status" class=" font-body border border-gray-300 rounded w-full pt-[8px] pb-[9px] pl-[18px] mb-[24px] leading-[23px] text-[13px]">
              <option value="todo">todo</option>
              <option value="doing">in progress</option>
              <option value="done">done</option>
            </select>

          </div> 

          <!-- Submit Task Button -->
           <button id="createNewTask" type="submit" class="w-[290px] h-[40px] rounded-[20px] bg-[#635FC7] text-white font-bold text-[13px] leading-[23px] md:w-[424px] md:m-auto md:flex md:items-center md:justify-center">Create Task</button>
         
        </form>
         

       </div>
  `;

  document.body.appendChild(modalPopUp);

  // Add event listener for the submit button to call the getTaskDetails function
  document.getElementById("createNewTask").addEventListener("click", function() {
    getNewTaskDetails();
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

  // alert user if task title is empty before creating new task
  if (title === "") {
    errorMessage.classList.remove("hidden");
    return;
  } 

  title = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
  
  // push task to our array
  const newTask = {
    id,
    title,
    description,
    status
  }
  initialTasks.push(newTask);

  renderTask(newTask);
  // save new tasks to local storage
  // localStorage.setItem("tasks", JSON.stringify(initialTasks));
  localStorage.setItem('myKey', JSON.stringify(initialTasks));
  console.log("Task added:", initialTasks);
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
