function loadComponent(id, file) {
  return fetch(file)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;
    })
    .catch((error) => console.error("Error loading component:", error));
}

const menuItems = [
  { page: "reviews.html", icon: "bi-chat-left-text", label: "クチコミ" },
  { page: "ranking.html", icon: "bi-trophy", label: "ランキング" },
];

function renderMenu() {
  const sidebarNav = document.getElementById("sidebarNav");
  if (!sidebarNav) {
    console.error("Sidebar not loaded yet.");
    return;
  }

  sidebarNav.innerHTML = "";
  menuItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("nav-item");

    const a = document.createElement("a");
    a.classList.add("nav-link");
    a.dataset.page = item.page;
    a.innerHTML = `<i class="bi ${item.icon} me-4"></i> ${item.label}`;

    if (index === 0) a.classList.add("active");

    li.appendChild(a);
    sidebarNav.appendChild(li);
  });

  console.log("Sidebar menu rendered successfully.");
}

function updateActiveMenu(page) {
  document.querySelectorAll("#sidebarNav .nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.dataset.page === page) {
      link.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  loadComponent("navbar", "components/navbar.html");
  loadComponent("sidebar", "components/sidebar.html").then(() => {
    renderMenu();
    updateActiveMenu(menuItems[0].page);
  });

  loadComponent("content", "pages/" + menuItems[0].page);

  document.addEventListener("click", function (event) {
    if (event.target.matches("[data-page]")) {
      event.preventDefault();
      let page = event.target.getAttribute("data-page");
      loadComponent("content", "pages/" + page);
      updateActiveMenu(page);
    }
  });
});
