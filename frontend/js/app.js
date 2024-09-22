document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('https://localhost:3000/api/tables');
    const data = await response.json();
  
    const tableBody = document.querySelector('#taskTable tbody');
    data.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row.name}</td>
        <td>${row.date}</td>
      `;
      tableBody.appendChild(tr);
    });
  });
  
  document.querySelector('#rulesSection input').addEventListener('change', async (e) => {
    const ruleUpdates = {
      startOfDay: document.querySelector('#startOfDay').checked,
      endOfDay: document.querySelector('#endOfDay').checked
    };
  
    const response = await fetch(`https://localhost:3000/api/tables/${rowId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rules: ruleUpdates })
    });
  
    const result = await response.json();
    alert(result.message);
  });
  