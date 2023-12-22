
let tasks = JSON.parse(localStorage.getItem("todos")??"[]")


const myInput = document.getElementById('myInput');
const myUL = document.querySelector('#myUL');




const save = (data) => {
  localStorage.setItem("todos", JSON.stringify(data))
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

function createItem(taskData){
      let li = document.createElement('li');
      if (taskData.stat) li.classList.add("checked")
      let text = document.createTextNode(taskData.text);
      let span = document.createElement('span');
      li.onclick = (onClickEvent) => {
        // for(let i = 0; i < tasks.length; i++){
        //   if(tasks.id === taskData.id){
        //     console.log(test);
        //   }
        // }
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

tasks.forEach((task) => createItem(task));



