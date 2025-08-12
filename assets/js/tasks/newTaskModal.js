// newModalElement.js
import { tasks } from "../script.js";
import { renderTasksToTheDom } from "../ui/renderTasks.js";
import { saveTasksToLocalStorage } from "../utils/localStorage.js";

export function newTaskModal() {
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
          <button class="w-[290px] h-[40px] rounded-[20px] bg-[#635FC7] text-white font-bold text-[13px] leading-[23px] md:w-[424px] md:m-auto md:flex md:items-center md:justify-center">Create Task</button>
          
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

function getNewTaskDetails() {
  // calculate the id of task entered by user and have it start at the last id from array
  let id = initialTasks[initialTasks.length - 1 ].id + 1

  // get user title, description and status entered
  let title = document.getElementById("newTitle").value.trim();
  let description = document.getElementById("newDescription").value.trim();
  let status = document.getElementById("newTaskStatus").value;
  let errorMessage = document.getElementById("errorMessage");

  if (title === null || title === undefined || title.trim().length === 0) {

    // Focus the input so user knows where to type
    document.getElementById("newTitle").focus();

    errorMessage.style.display = "block";
    return false; 
  } else {
    errorMessage.style.display = "none";   
  }

  title = title.charAt(0).toUpperCase() + title.slice(1);

  // Create new task
  const newTask = { id, title, description, status };

  // Push new task to the array
  tasks.push(newTask);
  renderTasksToTheDom(newTask);

  // Save new tasks to local storage that persists on page load
  saveTasksToLocalStorage(tasks);
  return true;
}

