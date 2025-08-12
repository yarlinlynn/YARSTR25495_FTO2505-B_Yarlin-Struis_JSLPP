
/**
* Dark and Light Theme Switch Button
*/

export function setupThemeToggle() {
  const desktopToggleBtn = document.getElementById("desktopToggleBtn");
  const mobileToggleBtn = document.getElementById("mobileToggleBtn");
  const htmlElement = document.documentElement;

  function setTheme() {
    const savedTheme = localStorage.getItem("color-theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }

  setTheme();

  function toggleTheme() {
    if (htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      htmlElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }

  if (desktopToggleBtn) desktopToggleBtn.addEventListener("click", toggleTheme);
  if (mobileToggleBtn) mobileToggleBtn.addEventListener("click", toggleTheme);
}
