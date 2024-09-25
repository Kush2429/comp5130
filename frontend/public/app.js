document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "sub123*") {
    window.location.href = "home.html"; // Redirect to home page for admin
  } else if (username === "123" && password === "123") {
    window.location.href = "home.html"; // Redirect to home page for user
  } else {
    alert("Invalid credentials. Please try again.");
  }
});

document.getElementById("logoutBtn")?.addEventListener("click", function () {
  window.location.href = "login.html"; // Redirect to login page on logout
});

// Home page functionality
if (document.getElementById("tableBody")) {
  document.getElementById("addRowBtn").addEventListener("click", function () {
    const tableBody = document.getElementById("tableBody");

    const newRow = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.className = "employee-name";
    nameCell.contentEditable = "true";
    nameCell.setAttribute("data-placeholder", "Enter Employee Name");
    newRow.appendChild(nameCell);

    const days = [
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
      "monday",
      "tuesday",
    ];
    days.forEach((day) => {
      const dayCell = document.createElement("td");
      const startTimeInput = document.createElement("input");
      startTimeInput.type = "time";
      startTimeInput.name = `${day}Start`;

      const endTimeInput = document.createElement("input");
      endTimeInput.type = "time";
      endTimeInput.name = `${day}End`;

      dayCell.appendChild(startTimeInput);
      dayCell.appendChild(document.createTextNode(" - "));
      dayCell.appendChild(endTimeInput);
      newRow.appendChild(dayCell);
    });

    const actionsCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.className =
      "bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700";
    deleteButton.innerText = "Delete";
    deleteButton.onclick = function () {
      deleteRow(this);
    };
    actionsCell.appendChild(deleteButton);
    newRow.appendChild(actionsCell);

    tableBody.appendChild(newRow);
  });
}

function deleteRow(button) {
  const row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
}
