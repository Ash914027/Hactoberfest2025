 let taskCount = 0;
        let isEditing = false;
        let currentRow = null;

        function addTask() {
            const taskText = document.getElementById('taskInput').value.trim();
            const dueDate = document.getElementById('dueDate').value;
            const priority = document.getElementById('priority').value;

            if (taskText === '' || dueDate === '') {
                alert("Please fill in both task and due date.");
                return;
            }

            const currentDate = new Date();
            const addedTime = currentDate.toLocaleString();

            const priorityClass = {
                High: 'priority-high',
                Medium: 'priority-medium',
                Low: 'priority-low'
            }[priority];

            if (isEditing && currentRow) {
                // Update existing task
                currentRow.children[1].textContent = taskText;
                currentRow.children[3].textContent = dueDate;
                currentRow.children[4].textContent = priority;
                currentRow.children[4].className = priorityClass;

                // Reset
                isEditing = false;
                currentRow = null;
                document.getElementById('addBtn').textContent = "Add Task";
            } else {
                taskCount++;
                const tbody = document.getElementById('taskBody');
                const row = document.createElement('tr');

                row.innerHTML = `
          <td>${taskCount}</td>
          <td>${taskText}</td>
          <td>${addedTime}</td>
          <td>${dueDate}</td>
          <td class="${priorityClass}">${priority}</td>
          <td>
            <button class="edit-btn" onclick="editTask(this)">Edit</button>
            <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
          </td>
        `;

                tbody.appendChild(row);
            }

            // Clear input fields
            document.getElementById('taskInput').value = '';
            document.getElementById('dueDate').value = '';
            document.getElementById('priority').value = 'Medium';
        }
       // function toggleTheme() {
       //     document.body.classList.toggle('dark-theme');
       // }

        function deleteTask(button) {
            const row = button.parentElement.parentElement;
            row.remove();

            // Reorder row numbers
            const rows = document.querySelectorAll("#taskBody tr");
            taskCount = 0;
            rows.forEach((tr, index) => {
                tr.children[0].textContent = index + 1;
                taskCount++;
            });

            // Reset if editing deleted row
            if (row === currentRow) {
                isEditing = false;
                currentRow = null;
                document.getElementById('addBtn').textContent = "Add Task";
            }
        }

        function editTask(button) {
            currentRow = button.parentElement.parentElement;
            const taskText = currentRow.children[1].textContent;
            const dueDate = currentRow.children[3].textContent;
            const priority = currentRow.children[4].textContent;

            document.getElementById('taskInput').value = taskText;
            document.getElementById('dueDate').value = dueDate;
            document.getElementById('priority').value = priority;

            document.getElementById('addBtn').textContent = "Update Task";
            isEditing = true;
        }