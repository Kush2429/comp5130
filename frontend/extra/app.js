document.getElementById('addRowBtn').addEventListener('click', function() {
  const tableBody = document.getElementById('tableBody');
  
  const newRow = document.createElement('tr');
  
  // Add editable employee name cell
  const nameCell = document.createElement('td');
  nameCell.className = 'employee-name';
  nameCell.contentEditable = 'true';
  nameCell.setAttribute('data-placeholder', 'Enter Employee Name');
  newRow.appendChild(nameCell);
  
  // Add time input cells for each day of the week
  const days = ['wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'monday', 'tuesday'];
  days.forEach(day => {
    const dayCell = document.createElement('td');
    const startTimeInput = document.createElement('input');
    startTimeInput.type = 'time';
    startTimeInput.name = `${day}Start`;
    
    const endTimeInput = document.createElement('input');
    endTimeInput.type = 'time';
    endTimeInput.name = `${day}End`;
    
    dayCell.appendChild(startTimeInput);
    dayCell.appendChild(document.createTextNode(' - ')); // Add separator
    dayCell.appendChild(endTimeInput);
    
    newRow.appendChild(dayCell);
  });
  
  tableBody.appendChild(newRow);
});

document.getElementById('addStartOfDayTask').addEventListener('click', function() {
  const task = prompt('Enter Start of Day Task:');
  if (task) {
    const taskList = document.getElementById('startOfDayTasks');
    const taskItem = document.createElement('div');
    taskItem.textContent = task;
    taskList.appendChild(taskItem);
  }
});

document.getElementById('addEndOfDayTask').addEventListener('click', function() {
  const task = prompt('Enter End of Day Task:');
  if (task) {
    const taskList = document.getElementById('endOfDayTasks');
    const taskItem = document.createElement('div');
    taskItem.textContent = task;
    taskList.appendChild(taskItem);
  }
});
