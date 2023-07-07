// Selecetor
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
// Event Listener
todoButton.addEventListener('click', addTodo);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);

// Function
function addTodo(event, content) {
  // event.preventDefault();

  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  const newTodo = document.createElement('input');
  newTodo.value = todoInput.value || content;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('buttons-div');
  todoDiv.appendChild(buttonsDiv);

  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"> </i>';
  completedButton.classList.add('complete-button');
  buttonsDiv.appendChild(completedButton);
  completedButton.addEventListener('click', checkTodo);

  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
  trashButton.classList.add('trash-button');
  buttonsDiv.appendChild(trashButton);
  trashButton.addEventListener('click', deleteTodo);

  const editButton = document.createElement('button');
  editButton.innerHTML = '<i class="fa-sharp fa-solid fa-pen-to-square"></i>';
  editButton.classList.add('edit-button');
  buttonsDiv.appendChild(editButton);
  editButton.addEventListener('click', editTodo);

  todoList.appendChild(todoDiv);

  saveLocalTodos(todoInput.value);

  todoInput.value = '';
}

function deleteTodo(event) {
  const item = event.target;
  if (item.classList.contains('trash-button')) {
    const wantDelete = item.parentElement;
    const todoDiv = wantDelete.parentElement;
    removeLocalTodos(todoDiv);
    todoDiv.classList.add('fall');
    todoDiv.addEventListener('transitionend', function () {
      todoDiv.remove();
    });
  }
}

function checkTodo(event) {
  const item = event.target;
  if (item.classList.contains('complete-button')) {
    // sor parent elemanin parenti id ya da class verip sec
    const wantCheck = item.parentElement;
    const todoDiv = wantCheck.parentElement;
    todoDiv.classList.toggle('completed');
    /* const completedHr = document.createElement('hr');

*/
  }
}

function editTodo(event) {
  console.log('edit');
  const item = event.target;
  if (item.classList.contains('edit-button')) {
    const wantEdit = item.parentElement;
    const todoDiv = wantEdit.parentElement;
    const todoItem = todoDiv.querySelector('input');
    console.log(todoItem);
    const oldText = todoItem.value;

    removeLocalTodos(todoDiv);

    console.log('aaa' + oldText);

    todoItem.classList.add('id', 'editing');
    todoItem.value = oldText;
    todoItem.focus();
    todoItem.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        const newContent = todoItem.value.trim();
        todoItem.innerText = newContent;
        console.log(newContent);
        saveLocalTodos(newContent);
      }
    });
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (event.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;

      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;

      // contains uncompleted ve unlem yokken niye calismadi
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('input');
    newTodo.value = todo;
    newTodo.classList.add('todo-item');
    newTodo.classList.remove('editable');
    todoDiv.appendChild(newTodo);

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons-div');
    todoDiv.appendChild(buttonsDiv);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"> </i>';
    completedButton.classList.add('complete-button');
    buttonsDiv.appendChild(completedButton);
    completedButton.addEventListener('click', checkTodo);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
    trashButton.classList.add('trash-button');
    buttonsDiv.appendChild(trashButton);
    trashButton.addEventListener('click', deleteTodo);

    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fa-sharp fa-solid fa-pen-to-square"></i>';
    editButton.classList.add('edit-button');
    buttonsDiv.appendChild(editButton);
    editButton.addEventListener('click', editTodo);

    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
