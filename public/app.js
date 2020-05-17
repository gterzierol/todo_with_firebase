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
const auth = firebase.auth();

//Add Button
const btnAdd = document.querySelector(".input-button");

//Todo-İtems
const container = document.querySelector(".container");
const todoItems = document.querySelectorAll(".todo-items");
const todoValue = document.querySelector(".input");
const todoList = document.querySelector(".todos");
const modalLogin = document.querySelector(".form-login");

window.addEventListener("load", loadTodo)
function loadTodo(e){
  
  modalLogin.style = "display: block";
  container.className += " blur"
  modalLogin.addEventListener("click", (e) =>{if(e.target.className === "close"){
    modalLogin.style = "display: none";
    container.className = "container";
  }})

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
    
    if(todoValue.value != ""){
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
    todoValue.value="";
    }else{
      const alertItem = document.createElement("div");
      alertItem.classList.add("alert", "alert-danger");
      alertItem.innerHTML ='<span>Lütfen Boş bırakmayın...!</span>';
      const input = document.querySelector(".todo-input")
      const title = document.querySelector(".title");

      input.parentNode.insertBefore(alertItem, input);
      
      let hideAlert = () => setTimeout(hidden, 5000)

      function hidden(){
        alertItem.remove();
      }
      
      hideAlert();
      

      // alert("lütfen boş bırakmayın!");
    
    }
    

  };
});

todoList.addEventListener("click", deleteCheck = (e) =>{
  console.log(e.target);
  const item = e.target
  if(e.target.className === "trash-btn"){
    
    const todo = item.parentElement.parentElement;
    todo.remove();
  }
  if(e.target.className === "completed-btn"){
    const todo = item.parentElement
    todo.classList.toggle("completed");

  }
});

//TODO: Authentication
