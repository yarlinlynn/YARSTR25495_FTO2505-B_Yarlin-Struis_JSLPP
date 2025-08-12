
/**
 * Add and remove sidebar on click
*/

export function setupSidebarToggle(sidebar, showSidebarBtn, hideSidebarBtn) {
  hideSidebarBtn.addEventListener("click", () => {
    if (sidebar.style.display === "none") {
      sidebar.style.display = "";
    } else {
      sidebar.style.display = "none";
    }
    showSidebarBtn.style.display = "block";
  });

  showSidebarBtn.addEventListener("click", () => {
    if (sidebar.style.display === "none") {
      sidebar.style.display = "block";
    }
    showSidebarBtn.style.display = "none";
  });
}


