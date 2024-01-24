const todoAddForm = document.querySelector('.todo-add-form');
const todoListArea = document.querySelector('.todo-lists');
const todoItemsSortBtns = document.querySelectorAll('.todoItemsSortBtns');
const todoLeftItems = document.querySelector('.todoLeftItems');
const todoItemsClearCompletedBtn = document.querySelector('.todoItemsClearCompletedBtn');
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
  todoLeftItemsCount();
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
  todoLeftItemsCount();
  saveToLocalStorage(newToDoItems);
}

function todoItemsSort(event){
    const sortType = event.target.dataset.type;
    switch(sortType){
      case 'all' : 
      showTodoItems(todoItems,todoListArea);
      break;
      case 'active':
        const todoActiveItems = todoItems.filter((items) => items.status == false);
        showTodoItems(todoActiveItems,todoListArea);
      break;
      case 'completed':
        const todoCompletedItems = todoItems.filter((items) => items.status == true);
        showTodoItems(todoCompletedItems,todoListArea);
      break;
    }
}

function todoLeftItemsCount(){
  const todoLeftItemsCount = todoItems.filter((items) => items.status == true);
  todoLeftItems.innerHTML = `<span>${todoLeftItemsCount.length}</span> items left`;
}

function todoItemsClearCompleted(){
    const todoItemsClearCompleted = todoItems.map((items,index,currentItems) => {
        if(currentItems[index].id == items.id){
          items.status = false;
        }
        return items;
    });
    saveToLocalStorage(todoItemsClearCompleted);
    showTodoItems(todoItemsClearCompleted,todoListArea);
}

function saveToLocalStorage(items){
  localStorage.setItem('todoItems',JSON.stringify(items));
}


todoAddForm.addEventListener('submit',todoAdd);
todoListArea.addEventListener('click',changeItemStatus);
todoItemsSortBtns.forEach((item) => {
  item.addEventListener('click',todoItemsSort);
});
todoItemsClearCompletedBtn.addEventListener('click',todoItemsClearCompleted);


showTodoItems(todoItems,todoListArea);