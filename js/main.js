const todoAddForm = document.querySelector('.todo-add-form');
const changeItemStatusBtn = document.querySelector('.todoCheckItem');
const todoListArea = document.querySelector('.todo-lists');
const todoItemsSortBtns = document.querySelectorAll('.todoItemsSortBtns');
const todoLeftItems = document.querySelector('.todoLeftItems');
const todoItemsClearCompletedBtn = document.querySelector('.todoItemsClearCompletedBtn');
const deleteCurrentToDoItemBtn = document.querySelector('.close');
const todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];



// ALL FUNCTIONS

function showTodoItems(items,todoListArea){
  todoListArea.innerHTML = '';
  items.forEach((item) => {
    const todoItemList = document.createElement('li');
    todoItemList.setAttribute('data-id', item.id);
    const changeStatusBtn = document.createElement('div');
    changeStatusBtn.classList.add('todoCheckItem');
    if(item.status) todoItemList.classList.add('checked');
    changeStatusBtn.textContent = item.text;
    const delBtn = document.createElement('span');
    delBtn.classList.add('close', 'fa', 'fa-trash-o');
    
    todoItemList.append(changeStatusBtn,delBtn);
    todoListArea.appendChild(todoItemList);
    changeStatusBtn.addEventListener('click',changeItemStatus);
    delBtn.addEventListener('click', deleteCurrentToDoItem);
  });
  todoLeftItemsCount();
}

function changeItemStatus(event){
  event.target.parentElement.classList.toggle("checked");

  const currentItemId = Number(event.target.parentElement.dataset.id);
  const newToDoItems = todoItems.map((item) => {
    if(item.id === currentItemId){
      item.status = !item.status; 
    }

    return item;

  });
  todoLeftItemsCount();
  saveToLocalStorage(newToDoItems);
}

// Сортировка To do Items
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
      default:
        console.log('No another types');
    }
}

// Счетчик для to do items
function todoLeftItemsCount(){
  const todoLeftItemsCount = todoItems.filter((items) => items.status === false);
  todoLeftItems.innerHTML = `<div class="todoLeftItemsCount"><span>${todoLeftItemsCount.length}</span> items left</div>`;
}



function deleteCurrentToDoItem(event){

  const currentToDoItemId = event.target.parentElement.getAttribute('data-id');
  todoItems.forEach((items,index) => {
      if(items.id == currentToDoItemId){
          todoItems.splice(index,1);
      }
  });
  
  showTodoItems(todoItems,todoListArea);
  saveToLocalStorage(todoItems);
  
}

function saveToLocalStorage(items){
  localStorage.setItem('todoItems',JSON.stringify(items));
}

if(todoItems.length > 0){
  showTodoItems(todoItems,todoListArea);
}

// ALL EVENTS

todoAddForm.addEventListener('submit',function (event){
  event.preventDefault();

  const todoItemText = event.target.todoItem.value;
  if(todoItemText.trim() !== ''){
    const todoItem = {
      id:Date.now(),
      text: todoItemText,
      status:false,
    };
    todoItems.unshift(todoItem);
  }
  
  saveToLocalStorage(todoItems);
  showTodoItems(todoItems,todoListArea);
  this.reset();
});

todoItemsSortBtns.forEach((item) => {
  item.addEventListener('click',todoItemsSort);
});
todoItemsClearCompletedBtn.addEventListener('click',function (){
  const todoItemsClearCompleted = todoItems.map((items,index,currentItems) => {
      if(currentItems[index].id == items.id){
        items.status = false;
      }
      return items;
  });
  saveToLocalStorage(todoItemsClearCompleted);
  showTodoItems(todoItemsClearCompleted,todoListArea);
});



