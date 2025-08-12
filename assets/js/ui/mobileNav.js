
import { setupThemeToggle } from "../utils/toggleTheme";

/**
 * Initializes the mobile navigation toggle button and renders the mobile nav UI when clicked.
 * This function appends a modal-like mobile navigation menu to the DOM,
 * including a backdrop, a close button, a sample board list, and a dark/light toggle.
*/

export function mobileNav() {
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