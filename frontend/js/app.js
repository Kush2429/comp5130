document.addEventListener('DOMContentLoaded', () => {
  // Save table data
  document.getElementById('saveTableBtn').addEventListener('click', () => {
    const tableData = [];
    const rows = document.querySelectorAll('#workHoursTable tbody tr');

    rows.forEach(row => {
      const rowData = [];
      row.querySelectorAll('td').forEach((cell, index) => {
        if (index > 0) { // Skip the first column (employee names)
          rowData.push(cell.innerText); // Get work hours
        }
      });
      tableData.push(rowData);
    });

    console.log('Saved Table Data:', tableData);
    alert('Table data saved! Check console for output.');
  });

  // Functionality for Start of the Day
  const startOfDaySection = document.getElementById('startOfDayTasks');
  const addStartOfDayTaskBtn = document.getElementById('addStartOfDayTask');

  addStartOfDayTaskBtn.addEventListener('click', () => {
    // Create input box for task entry
    const inputBox = document.createElement('input');
    inputBox.type = 'text';
    inputBox.placeholder = 'Enter task';

    // Append the input box
    startOfDaySection.appendChild(inputBox);

    // Listen for task entry
    inputBox.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        const taskValue = inputBox.value;
        if (taskValue) {
          addCheckboxToSection(taskValue, startOfDaySection);
          inputBox.remove();
        }
      }
    });
  });

  // Functionality for End of the Day
  const endOfDaySection = document.getElementById('endOfDayTasks');
  const addEndOfDayTaskBtn = document.getElementById('addEndOfDayTask');

  addEndOfDayTaskBtn.addEventListener('click', () => {
    // Create input box for task entry
    const inputBox = document.createElement('input');
    inputBox.type = 'text';
    inputBox.placeholder = 'Enter task';

    // Append the input box
    endOfDaySection.appendChild(inputBox);

    // Listen for task entry
    inputBox.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        const taskValue = inputBox.value;
        if (taskValue) {
          addCheckboxToSection(taskValue, endOfDaySection);
          inputBox.remove();
        }
      }
    });
  });

  // Function to add a checkbox for the entered task
  function addCheckboxToSection(task, section) {
    const taskDiv = document.createElement('div');
    taskDiv.innerHTML = `
      <input type="checkbox" id="${task}">
      <label for="${task}">${task}</label>
    `;
    section.appendChild(taskDiv);
  }
});