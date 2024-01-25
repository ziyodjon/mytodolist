const todoAddForm = document.querySelector('.todo-add-form');
const changeItemStatusBtn = document.querySelector('.todoCheckItem');
const todoListArea = document.querySelector('.todo-lists');
const todoItemsSortBtns = document.querySelectorAll('.todoItemsSortBtns');
const todoLeftItems = document.querySelector('.todoLeftItems');
const todoItemsClearCompletedBtn = document.querySelector('.todoItemsClearCompletedBtn');
const deleteCurrentToDoItemBtn = document.querySelector('.close');
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
  todoListArea.innerHTML = '';
  items.forEach((item) => {
    let li = document.createElement('li');
    li.setAttribute('data-id', item.id);
    let changeStatusBtn = document.createElement('div');
    changeStatusBtn.setAttribute('class','todoCheckItem');
    if(item.status) li.setAttribute('class', 'checked');
    changeStatusBtn.innerHTML = item.text;
    let delBtn = document.createElement('span');
    delBtn.setAttribute('class', 'close fa fa-trash-o');
    
    li.appendChild(changeStatusBtn);
    li.appendChild(delBtn);
    todoListArea.appendChild(li);
    changeStatusBtn.addEventListener('click',changeItemStatus);
    delBtn.addEventListener('click', deleteCurrentToDoItem);
  });
  todoLeftItemsCount();
}

function changeItemStatus(event){
  // event.target.classList.toggle("checked");
  // //const currentItemId = Number(event.target.dataset.id);
  // const newToDoItems = todoItems.map((item,index,currentToDoItems) => {
  //   if(item.id === +currentToDoItems[index].id){
  //     item.status = !item.status; 
  //   }

  //   return item;
  // });
  // todoLeftItemsCount();
  // saveToLocalStorage(newToDoItems);
  event.target.parentElement.classList.toggle("checked");
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
    }
}

// Счетчик для to do items
function todoLeftItemsCount(){
  const todoLeftItemsCount = todoItems.filter((items) => items.status == false);
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

function deleteCurrentToDoItem(event){
  const currentToDoItemId = event.target.parentElement.getAttribute('data-id');
  const deleteCurrentToDoItem = todoItems.filter((items) => items.id != currentToDoItemId);
  
  showTodoItems(deleteCurrentToDoItem,todoListArea);
  saveToLocalStorage(deleteCurrentToDoItem);
  
  
  console.log(currentToDoItemId);
  console.log(currentToDoItemId);
  //saveToLocalStorage(deleteCurrentToDoItem);
    // showTodoItems(deleteCurrentToDoItem,todoListArea);
  //console.log(deleteCurrentToDoItem);
  // const deleteCurrentToDoItem = todoItems.map((items,index,currentItems) => {
  //   if(items.id == currentItems[index].id){
  //     todoItems.pop();
  //   }
  //   return items;
  // });
  //const currentToDoItemId = event.target.parentElement.getAttribute('data-id');
  
}

function saveToLocalStorage(items){
  localStorage.setItem('todoItems',JSON.stringify(items));
}


todoAddForm.addEventListener('submit',todoAdd);
//changeItemStatusBtn.addEventListener('click',changeItemStatus);
todoItemsSortBtns.forEach((item) => {
  item.addEventListener('click',todoItemsSort);
});
todoItemsClearCompletedBtn.addEventListener('click',todoItemsClearCompleted);


showTodoItems(todoItems,todoListArea);