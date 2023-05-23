$(document).ready(onReady);

function onReady() {
  fetchTasks();
  $('#add-task-button').on('click', createTask);
  $(document).on('click', '.delete-button', deleteTask);
  $(document).on('click', '.complete-button', completeTask);
}

// GET function:
function fetchTasks() {
  $.ajax({
    method: 'GET',
    url: '/tasks'
  }).then((response) => {
    renderTasks(response);
  }).catch((error) => {
    console.log('fetchTasks ajax error:', error);
  })
}

// Render tasks on the DOM:
function renderTasks(taskList) {
  // Empty the table body:
  $('#the-tasks').empty();

  // Loop through the array of task objects:
  for (let task of taskList) {
    let cssClass = task.is_done ? 'complete' : '';
    // Append a task as a table row:
    $('#the-tasks').append(`
      <tr class="${cssClass}" data-id=${task.id}>
        <td>
          <button class="delete-button">🗑</button>
        </td>
        <td>
          <button class="complete-button">✔️</button>
        </td>
        <td>
          ${task.todoText}
        </td>
      </tr>
    `)
  }
}

// POST function:
function createTask() {
  // Get the value user typed in input:
  const newTask = $('#task-input').val();

  // Make a POST request, sending the newTask
  // to the server:
  $.ajax({
    method: 'POST',
    url: '/task',
    data: { 
      todo_text: newTask,
      is_done: false
    }
  }).then((response) => {
    $('#task-input').val('');
    fetchTasks();
  }).catch((error) => {
    console.log('createTask ajax error:', error);
  })
}

// DELETE function:
function deleteTask() {
  // Grab the id of the task we want to delete:
  const idToDelete = $(this).closest('tr').data('id');
  
  $.ajax({
    method: 'DELETE',
    url: `/tasks/${idToDelete}`
  }).then((response) => {
    fetchTasks();
  }).catch((error) => {
    console.log('deleteTask ajax error:', error);
  })
}

// PUT function:
function completeTask() {
  const idToUpdate = $(this).closest('tr').data('id');

  $.ajax({
    method: 'PUT',
    url: `/tasks/${idToUpdate}`
  }).then((response) => {
    fetchTasks();
  }).catch((error) => {
    console.log('completeTask ajax error:', error);
  })
}