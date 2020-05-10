var firebaseConfig = {
  apiKey: "AIzaSyCwNndGpDic-RwbaUtIRJTHMnVlsNWE598",
  authDomain: "todo-54c37.firebaseapp.com",
  databaseURL: "https://todo-54c37.firebaseio.com",
  projectId: "todo-54c37",
  storageBucket: "todo-54c37.appspot.com",
  messagingSenderId: "1037538431573",
  appId: "1:1037538431573:web:6d188e3dfe634d871abadc",
  measurementId: "G-XEMRT9B4K0"
};
console.log(this)

//Add Button
const btnAdd = document.querySelector(".input-button");

//Todo-İtems
const todoItems = document.querySelectorAll(".todo-items");

const todoValue = document.querySelector(".input");
const todoList = document.querySelector(".todos");

window.addEventListener("load", loadTodo)
function loadTodo(e){
  console.log(this);
  const database = firebase.database().ref("/todos/").once("value", function (snapshot){    snapshot.forEach(function(childSnapShot)
    {
      let childkey =  childSnapShot.key;
      let childvalue = childSnapShot.val();
      console.log(childkey,childvalue);

      var todo = `
      <li class="todo-items">
        <div class="todo-item">
          <span class="todo">${childvalue.value}</span>
            <button class="completed-btn"><i class="fa fa-check"></i></button>
            <button class="trash-btn"><i class="fa fa-trash"></i></button>
          </div>
      </li>`;
      todoList.innerHTML = todo;
    })
  });

  console.log(database);
}

btnAdd.addEventListener("click", addTodo=(e)=>{
  console.log(e.target.className);

  if(e.target.className === "input-button" || e.target.className === "fa fa-plus-square"){
    
    //create li
    const todoLi = document.createElement("li");
    todoLi.classList.add("todo-items");
    //create div under li
    const todoItem  = document.createElement("div");
    todoItem.classList.add("todo-item");
    //create span under div
    const todo = document.createElement("span");
    todo.classList.add("todo");
    todo.innerText = todoValue.value;

    //Completed Button
    const completedButton  = document.createElement("button");
    completedButton.innerHTML = '<i class="fa fa-check"></i>';
    completedButton.classList.add("completed-btn");
    //Trash button

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa fa-trash"></i>';
    trashButton.classList.add("trash-btn");

    todoItem.appendChild(todo);
    todoItem.appendChild(completedButton);
    todoItem.appendChild(trashButton);
    todoLi.appendChild(todoItem);

    // Create Todo
    todoList.appendChild(todoLi);

    console.log(todoValue.value)
    //Add DB
      firebase.database().ref('/todos/').push({
      todo: todoValue.value,
    });

  };
});

todoList.addEventListener("click", deleteCheck = (e) =>{
  console.log(e.target);
  const item = e.target
  if(e.target.className === "trash-btn"){
    
    const todo = item.parentElement;
    todo.remove();
  }
  if(e.target.className === "completed-btn"){
    const todo = item.parentElement
    todo.classList.toggle("completed");

  }
});

//TODO: Authentication