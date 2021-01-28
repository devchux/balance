export function closeNav(container) {
  container.style.display = "block";
  container.classList.remove("navbar-slide-out");
  container.classList.add("navbar-slide-in");
  setTimeout(() => {
    container.style.display = "none";
  }, 800);
}

export function openNav(container) {
  container.style.display = "block";
  container.classList.remove("navbar-slide-in");
  container.classList.add("navbar-slide-out");
}
