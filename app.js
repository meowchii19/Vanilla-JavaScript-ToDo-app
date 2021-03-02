const todoList = document.querySelector("[data-lists]")
const todoInput = document.querySelector('.todo-input')
const filterOption = document.querySelector(".filter-todo");

//Add event Listeners
filterOption.addEventListener('click', filterLists)
todoList.addEventListener('click', deleteCheck)
document.addEventListener("DOMContentLoaded", getTodos)


const button = document.querySelector('[data-button]')
  button.addEventListener('click', () => {
    if(todoInput.value === '') return
    else addTodo()
  })



function addTodo(){
  //  event.preventDefault()
    //Create DIV
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
     //Create LI
    const newList = document.createElement('li')
    newList.innerText = todoInput.value
    //save to local
    saveLocalTodos(todoInput.value);

    newList.classList.add('todo-item')
    todoDiv.appendChild(newList)
    //CHECK MARK BUTTON
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)

    //CHECK MARK BUTTON
    const trashedButton = document.createElement('button')
    trashedButton.innerHTML =  '<i class="fas fa-trash"></i>';
    trashedButton.classList.add('trash-btn')
    todoDiv.appendChild(trashedButton)
    //append todoDiv to lists
    todoList.appendChild(todoDiv)
    // clear Input Value
    todoInput.value = ''
}


function deleteCheck(e) {
    const item = e.target
    const button = e.target.classList[0]

    //delete TODO
    if(button === 'trash-btn') {
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall')
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', () => 
        todo.remove()
        )
    }

    // chech Mark
    if(button === 'complete-btn') {
        
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }   
}

function filterLists(e) {
    const todos = todoList.childNodes;
    todos.forEach(todo => {
      switch (e.target.value) {
        case "all":
          todo.style.display = 'flex'
          break;
        case "completed":
          (todo.classList.contains("completed")) ? todo.style.display = 'flex': todo.style.display ='none';
          break;
        case "uncompleted":
            (!todo.classList.contains("completed")) ? todo.style.display = 'flex' : todo.style.display ='none' ;
    }
  })
}

function saveLocalTodos(todo) {
  let todos;
  (localStorage.getItem("todos") === null) ? todos = [] :  todos = JSON.parse(localStorage.getItem("todos"));
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  let todos;
  (localStorage.getItem("todos") === null) ? todos = [] :  todos = JSON.parse(localStorage.getItem("todos"));
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  (localStorage.getItem("todos") === null) ? todos = [] :  todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach(function(todo) {
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}