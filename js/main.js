const todoAddForm = document.querySelector('.todo-add-form');
const todoListArea = document.querySelector('.todo-lists');
const todoItems = JSON.parse(localStorage.getItem('todoItems'));


function todoAdd(event){
  event.preventDefault();
  const todoItemText = event.target.todoItem.value;
  const todoItem = {
    text: todoItemText,
    status:false,
  };
  todoItems.push(todoItem);
  localStorage.setItem('todoItems',JSON.stringify(todoItems));
  showTodoItems(todoItems,todoListArea);
  this.reset();
}

function showTodoItems(items,todoListArea){
  todoListArea.innerHTML = items.map((item,index) => {
    return `<li>${item.text}</li>`;
  }).join('');
}

function changeItemStatus(event){
  event.target.classList.toggle("checked");
}


todoAddForm.addEventListener('submit',todoAdd);
todoListArea.addEventListener('click',changeItemStatus);

showTodoItems(todoItems,todoListArea);