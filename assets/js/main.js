// Function to load components dynamically
function loadComponent(id, file) {
  fetch(file)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;
    })
    .catch((error) => console.error("Error loading component:", error));
}

// Load Navbar, Sidebar, and Footer
document.addEventListener("DOMContentLoaded", function () {
  loadComponent("navbar", "components/navbar.html");
  loadComponent("sidebar", "components/sidebar.html");
  // loadComponent("footer", "components/footer.html");

  // Dynamic content loading
  document.addEventListener("click", function (event) {
    if (event.target.matches("[data-page]")) {
      event.preventDefault();
      let page = event.target.getAttribute("data-page");
      loadComponent("content", "pages/" + page);
    }
  });
});

const menuItems = [
  { page: "dashboard", icon: "bi-speedometer2", label: "Dashboard" },
  { page: "achievements", icon: "bi-trophy", label: "Achievements" },
  { page: "users", icon: "bi-people", label: "Users" },
  { page: "reports", icon: "bi-file-text", label: "Reports" },
  { page: "settings", icon: "bi-gear", label: "Settings" },
];

function renderMenu() {
  const sidebarNav = document.getElementById("sidebarNav");
  sidebarNav.innerHTML = ""; // Clear existing menu items

  menuItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("nav-item");

    const a = document.createElement("a");
    a.classList.add("nav-link");
    a.dataset.page = item.page;
    a.innerHTML = `<i class="bi ${item.icon} me-2"></i> ${item.label}`;
    if (index === 0) a.classList.add("active"); // Default active item

    li.appendChild(a);
    sidebarNav.appendChild(li);
  });
}

renderMenu();
