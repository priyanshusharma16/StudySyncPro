let userName = "";

function loginUser() {
  const input = document.getElementById("usernameInput");
  if (!input.value.trim()) return alert("Please enter your name!");
  userName = input.value.trim();

  document.getElementById("loginPage").style.display = "none";
  document.getElementById("dashboardPage").style.display = "flex";
  loadPage("dashboard");
}

// Pages
const pages = {
  dashboard: () => `
    <header>
      <h1>Welcome Back, ${userName} 👋</h1>
      <p>Your personalized learning dashboard</p>
    </header>
    <section class="cards">
      <div class="card"><h3>📚 My Courses</h3><p>5 Enrolled</p></div>
      <div class="card"><h3>📝 Assignments</h3><p>2 Pending</p></div>
      <div class="card"><h3>📈 Progress</h3><div class="progress"><div class="progress-bar" style="width: 70%"></div></div></div>
    </section>
    <section class="activity">
      <h2>📌 Recent Activity</h2>
      <ul>
        <li>✔️ Completed AR/VR Introduction</li>
        <li>📖 Started Human Computer Interaction</li>
      </ul>
    </section>
  `,
  courses: () => `
    <h1>📚 My Courses</h1>
    <ul>
      <li>🔹 AR/VR Technologies</li>
      <li>🔹 Human Computer Interaction</li>
      <li>🔹 AI Basics</li>
    </ul>
  `,
  assignments: () => `
    <h1>📝 Assignments</h1>
    <ul id="assignmentList">
      <li>📌 Submit HCI Notes (Due: April 10)</li>
    </ul>
    <input type="text" id="newAssignment" placeholder="Add new assignment..." />
    <button onclick="addAssignment()">Add</button>
  `,
  messages: () => `<h1>📨 Messages</h1><p>No new messages.</p>`,
  settings: () => `<h1>⚙️ Settings</h1><p>Settings page coming soon.</p>`,
  logout: () => {
    document.getElementById("dashboardPage").style.display = "none";
    document.getElementById("loginPage").style.display = "flex";
    document.getElementById("usernameInput").value = "";
    showToast("👋 Logged out");
    return "";
  },
};

// Load selected page
function loadPage(page) {
  const main = document.getElementById("main-content");
  if (page === "logout") {
    main.innerHTML = "";
    pages[page]();
  } else {
    main.innerHTML = pages[page] ? pages[page]() : "<h1>404 - Not Found</h1>";
  }

  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("data-page") === page) link.classList.add("active");
  });
}

// Assignment Add
function addAssignment() {
  const input = document.getElementById("newAssignment");
  if (input.value.trim()) {
    const ul = document.getElementById("assignmentList");
    const li = document.createElement("li");
    li.textContent = "📌 " + input.value;
    ul.appendChild(li);
    input.value = "";
    showToast("✅ Assignment Added!");
  }
}

// Navigation
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const page = link.getAttribute("data-page");
    loadPage(page);
  });
});

// Dark Mode
document.querySelector(".toggle-dark").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Toast Notification
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.style.opacity = 1;
  setTimeout(() => (toast.style.opacity = 0), 3000);
}
