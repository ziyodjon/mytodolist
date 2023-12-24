
let tasks = JSON.parse(localStorage.getItem("todos")??"[]");

const myInput = document.getElementById('myInput');
const myUL = document.querySelector('#myUL');
const taskCountBlock = document.querySelector('.todo-count span');

// Sort buttons
const actions = document.querySelectorAll('.filter');
let actionState = "all"
actions.forEach((action)=>{
  action.addEventListener('click',() => {
    const method = action.getAttribute("data-action")
    actionState=method

    reRender()
    sortItems(tasks, method);
  });
})

const reRender = ()=>{
  actions.forEach((action)=>{
    const method= action.getAttribute("data-action")
    if (method===actionState) action.classList.add("active-action");
    else action.classList.remove("active-action")
  })
}
myInput.addEventListener('keypress', (e) => {
  if(e.code === 'Enter' && myInput.value !== ''){
    const newTask = {
      id: Date.now(),
      text: myInput.value,
      stat: false
    }
    tasks.push(newTask);
    createItem(newTask);
    save(tasks);
    
    myInput.value = '';
  }
});

const save = (data) => {
  localStorage.setItem("todos", JSON.stringify(data))
}

function sortItems(tasks,type){
    let filteredTasks = [];
  switch(type){
    case 'all':
      filteredTasks = tasks
    break;
    case 'active':
      filteredTasks = tasks.filter((e) => e.stat === false);
    break;
    case 'completed':
      filteredTasks = tasks.filter((e) => e.stat === true);
    break;
  }
myUL.innerHTML=''
  filteredTasks.forEach((task)=>{
    createItem(task)
  });

}

function createItem(taskData){
      let li = document.createElement('li');

      if (taskData.stat) li.classList.add("checked")
      let text = document.createTextNode(taskData.text);
      let span = document.createElement('span');
      li.onclick = (onClickEvent) => {
        taskCountBlock.innerHTML = 6 ;
        const newTasks = tasks.map(task => {
          if(task.id === taskData.id){
            const stat = !task.stat
            task.stat = stat;
          if (stat)
            onClickEvent.target.classList.add('checked');
          else onClickEvent.target.classList.remove("checked")
            
          }
          return task;
        });
        save(newTasks);
      }
      span.onclick = (e) =>{
        const li = e.currentTarget.parentNode;
        li.parentNode.removeChild(li);
        tasks = tasks.filter((task) => task.id !== taskData.id);
        save(tasks);
      }
      span.className = 'close fa fa-trash-o';
      li.appendChild(text);
      li.appendChild(span);
      myUL.insertBefore(li, myUL.firstChild);

}

  console.log(tasks)
tasks.forEach((task) => createItem(task));


//(all.classList.contains('activated') ? tasks : actives.classList.contains('activated') ? tasks.filter(task => task.stat === false) : completed.classList.contains('activated') ? tasks.filter(task => task.stat === true) : []).forEach((task) => createItem(task));





