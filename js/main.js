let todos = [{
    id: 1,
    name: "Nimadur Qilish",
    isQuick: false
  },
  {
    id: 2,
    name: "Qatgadur Borish",
    isQuick: false
  },
  {
    id: 3,
    name: "Yugurish",
    isQuick: false
  },
  {
    id: 4,
    name: "Kachatsa qilish",
    isQuick: false
  },
]


let initialId = 5;


let todosWrapper = document.querySelector(".todo-list");
let form = document.querySelector("form");
let nameInput = form.querySelector("#todoName");
let quickCheck = form.querySelector("#todoQuick");
let formSubmiter = form.querySelector("#form-submiter");
let count = document.querySelector(".count");
let ChopAllBtn = document.querySelector("#chop-all");




let showTodos = function (todosArray) {
  todosWrapper.innerHTML = "";
  todosArray.forEach(todo => {
    let todoWrapper = document.createElement("li");
    let todoCheck = document.createElement("input");
    let todoName = document.createElement("div");
    let editBtn = document.createElement("button");
    let deletBtn = document.createElement("button");


    todoCheck.type = "checkbox";
    todoCheck.dataset.id = todo.id;

    todoWrapper.className = "todo-item";
    if (todo.isQuick) {
      todoWrapper.classList.add("todo-item--quick");
    }
    todoName.textContent = todo.name;

    editBtn.textContent = "Edit";
    editBtn.dataset.id = todo.id;
    editBtn.className = "edit-btn";

    deletBtn.textContent = "Delet";
    deletBtn.dataset.id = todo.id;
    deletBtn.className = "deletBtn";


    todoWrapper.prepend(todoName);
    todoWrapper.append(editBtn);
    todoWrapper.append(deletBtn);
    todoWrapper.append(todoCheck);

    todosWrapper.append(todoWrapper);
  });
}
showTodos(todos)


let FormTaype = {
  SAVE: "seve",
  EDIT: "edit"
}


let formTaype = FormTaype.SAVE
let editingTodoId = null;


form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (formTaype === FormTaype.SAVE) {
    if (nameInput.value.trim()) {
      todos.push({
        id: initialId++,
        name: nameInput.value,
        isQuick: quickCheck.checked
      })
    }
    showTodos(todos);
    form.reset();
  } else if (formTaype === FormTaype.EDIT) {
    let editingItem = {
      id: editingTodoId,
      name: nameInput.value,
      isQuick: quickCheck.checked
    }
    let editingItemIndex = todos.findIndex((todo) => {
      return todo.id === editingItem.id;
    })
    todos.splice(editingItemIndex, 1, editingItem)
    showTodos(todos);
    form.reset();
    formTaype = FormTaype.SAVE;
    formSubmiter.textContent = "Saqlash";
  }
})




todosWrapper.addEventListener("click", (evt) => {
  if (evt.target.matches(".deletBtn")) {
    let clicked = evt.target.dataset.id - 0;
    let clickedItemIndex = todos.findIndex((todo) => {
      return todo.id === clicked
    })
    todos.splice(clickedItemIndex, 1);
    showTodos(todos)
  }
  if (evt.target.matches(".edit-btn")) {
    let editingTodoId = evt.target.dataset.id - 0;
    formTaype = FormTaype.EDIT;
    let editingItem = todos.find((todo) => {
      return todo.id === editingTodoId
    })
    nameInput.value = editingItem.name;
    quickCheck.checked = editingItem.isQuick;
    formSubmiter.textContent = "O'zgartirish";
  }

})

let checkedsArray = []



todosWrapper.addEventListener("change", (evt) => {
  if (evt.target.checked) {
    checkedsArray.push(evt.target.dataset.id - 0);
  } else {
    let clickedItemIndex = checkedsArray.findIndex((todoId) => {
      return todoId === evt.target.dataset.id - 0;
    })
    checkedsArray.splice(clickedItemIndex, 1)
  }
  count.textContent = checkedsArray.length;
})

ChopAllBtn.addEventListener("click", () => {
  checkedsArray.forEach((todoId) => {
    let currentDaletableIndex = todos.findIndex((todo) => {
      return todo.id === todoId
    })
    todos.splice(currentDaletableIndex, 1);
    showTodos(todos)
    count.textContent = todos.length
  })
})