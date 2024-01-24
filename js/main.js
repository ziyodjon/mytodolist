const todoAddForm = document.querySelector('.todo-add-form');
const todoListArea = document.querySelector('.todo-lists');
const todoItemsSortBtns = document.querySelectorAll('.todoItemsSortBtns');
const todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];


function todoAdd(event){
  event.preventDefault();
  const todoItemText = event.target.todoItem.value;
  const todoItem = {
    id:Date.now(),
    text: todoItemText,
    status:false,
  };
  todoItems.push(todoItem);
  saveToLocalStorage(todoItems);
  showTodoItems(todoItems,todoListArea);
  this.reset();
}

function showTodoItems(items,todoListArea){
  todoListArea.innerHTML = items.map((item,index) => {
    return `<li data-id = '${item.id}' class='${(item.status == true) ? 'checked' : ''}'>${item.text}</li>`;
  }).join('');
}

function changeItemStatus(event){
  event.target.classList.toggle("checked");
  const currentItemId = Number(event.target.dataset.id);
  const newToDoItems = todoItems.map((item) => {
    if(item.id === currentItemId){
      item.status = !item.status; 
    }

    return item;
  });
  saveToLocalStorage(newToDoItems);
}

function todoItemsSort(event){
    const sortType = event.target.dataset.type;
    console.log(sortType);
}

function saveToLocalStorage(items){
  localStorage.setItem('todoItems',JSON.stringify(items));
}


todoAddForm.addEventListener('submit',todoAdd);
todoListArea.addEventListener('click',changeItemStatus);
todoItemsSortBtns.forEach((item) => {
  item.addEventListener('click',todoItemsSort);
});


showTodoItems(todoItems,todoListArea);